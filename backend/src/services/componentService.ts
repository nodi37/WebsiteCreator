import IComponent from '../interfaces/IComponent';
import Component from '../models/Component';
import IQueryError from '../interfaces/IQueryError';
import IParams from '../interfaces/IParams';
import { calculateSkipLimit } from '../helpers/skipLimitCalculator';
import { createQueryObject } from '../helpers/queryObjectCreators';
import { maxResponseCount, filtersDefinition } from '../config/componentsRouteConfig';



const saveNewComponent = async (body: IComponent) => {
    try {
        const response = await new Component(body).save();
        return response;
    } catch (error) {
        const catchedError = error as IQueryError;
        if (catchedError.code != 11000) {
            console.log(error);
        }
        const err = new Error('Duplicate key error!') as IQueryError;
        err.code = catchedError.code;
        throw err;
    }
};


const editExistingComponent = async (body: IComponent, id: string) => {
    try {
        const response = await Component.findByIdAndUpdate(id, body, { returnDocument: 'after' });
        return response;
    } catch (error) {
        console.log(error);
    }
}

const replaceExistingComponent = async (body: IComponent, id: string) => {
    try {
        const response = await Component.findOneAndReplace({ _id: id }, body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const deleteSingleComponent = async (id: string) => {
    try {
        const response = await Component.findByIdAndDelete(id);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getOneComponent = async (id: string) => {
    try {
        const response = await Component.findById(id);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getManyComponents = async (params: IParams) => {
    const { skip, limit } = calculateSkipLimit(Number(params.skip), Number(params.limit), maxResponseCount);
    const sortBy = params.sortBy || 'name';
    const sortOrder = params.sortOrder === 'descending' ? '-' : '';
    const queryObject = createQueryObject(Component, filtersDefinition, params);
    console.log(params)
    console.log(queryObject)

    try {
        const response = await Component.find(queryObject).sort(sortOrder + sortBy).skip(skip).limit(limit);
        return response;
    } catch (error) {
        console.log(error);
    }
}


export {
    saveNewComponent,
    editExistingComponent,
    replaceExistingComponent,
    deleteSingleComponent,
    getOneComponent,
    getManyComponents
};
