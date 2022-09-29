//////////////////////////////////////////////////// THIS WILL PROBABLY NOT SCALE BUT WORKS FOR NOW //////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////// I NEED TO CHECK THIS LATER  ///////////////////////////////////////////////////////////////


//MAKE SURE THAT TYPES ARE RIGHT IN FILTERS DEFINITION IN CONFIG FILES
//USING WRONG TYPE WILL CAUSE --------->CastError<------------


//Creating filters:

// For keyword searching:
//     1. Add entry "keyword" in yup validator.
//     2. Define filters definitions in Route Config
//     3. Add fields names to arrays. If you want to pass a keyword to field which has number type use 'keywordNumberType' otherwise use 'keywordStringType'.
//         Accepts nested paths too 
//         example:

//         filtersDefinitions = {
//             keywordStringType: [
//                 'fieldName'
//             ],
//             keywordNumberType: [
//                 'fieldName'
//                 'fieldName.nestedFieldName'
//             ]
//         }

//     This is if You want to search for keyword in for example name and phone number which has String and Number types. 
//     Incoming value will be converted to number if its possible and then passed to mongoose find func. 
//     Its required because mongoDB not let to search in fields with number type using strings, value needs to be converted to Number type.


// For other values: 
//     1. Add entry in Yup Validator to let value pass in and it will be done automatically if its simple value, like Number or String. If you want to look for phrase or regexp use keyword query.
//     2. If You need to use nested path you can add it to filtersDefinitions like so:

//     filtersDefinitions = {
//         >employeeOf: 'employeeOf.companyId',<
//         keywordStringType: [
//             'smth'
//         ],
//         keywordNumberType: [
//             'smth'
//         ]
//     }

//     Now if You pass employeeOf as queryParameter, mongoose will look for it in employeeOf.companyId

import createObjectFromStrings from '../utils/object.utils';
import mongoose from 'mongoose';
import IFilterDefinitions from '../interfaces/IFilterDefinitions';
import IDynamicObject from '../interfaces/IDynamicObject';
import IParams from '../interfaces/IParams';


const createQueryObject = (mongooseModel: mongoose.Model<any>, filtersDefinitions: IFilterDefinitions, paramsObj: IParams) => {

    const entries = new Map();
    const schemaKeys = Object.keys(mongooseModel.schema.paths);

    //Loops throguh paramsObj === req.query
    for (const [key, value] of Object.entries(paramsObj)) {
        //If there is filter definition uses filter definition
        if (filtersDefinitions && filtersDefinitions.hasOwnProperty(key)) {
            const keyDefinition = Object.getOwnPropertyDescriptor(filtersDefinitions, key);
            entries.set(keyDefinition!.value, value);
            //If there's not but Model includes field from paramsObj then adds it to query object. 
            //This creates filters automatically and skips fields like skip and limit etc
        } else if (schemaKeys.includes(key)) {
            entries.set(key, value);
        }
    }

    const queryObj = Object.fromEntries(entries);

    //If there is a keyword param then creates entry for keyword search.
    if (!!paramsObj.keyword) {
        queryObj.$or = createKeywordSearchArray(filtersDefinitions.keywordStringType, filtersDefinitions.keywordNumberType, paramsObj.keyword);
    }

    //MAKE SURE THAT TYPES ARE GOOD IN FILTERS DEFINITION IN CONFIG FILES
    //USING WRONG TYPE WILL CAUSE --------->CastError<------------
    return queryObj;
}



const createKeywordSearchArray = (stringFieldsArr: string[], numberFieldsArr: string[], keyword: string | number): Array<IDynamicObject> => {
    //This func creates an array to assign to "$or" field to object in mongooseModel.find(>object<)
    const toReturn: Array<IDynamicObject> = [];

    //Number values creator
    if (!isNaN(Number(keyword))) {
        numberFieldsArr.forEach(fieldName => toReturn.push(createObjectFromStrings([fieldName], [keyword])));
    } else if (!!stringFieldsArr) {
        //String values creator
        const regex = new RegExp(keyword.toString(), 'i');
        stringFieldsArr.forEach(fieldName => toReturn.push(createObjectFromStrings([fieldName], [regex])));
    }

    return toReturn;
}


export { createQueryObject };