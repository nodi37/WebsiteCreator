import IQueryError from '../interfaces/IQueryError';
import ISetting from '../interfaces/ISetting';
import Setting from '../models/Setting';


const addNewSetting = async (body: ISetting) => {
    try {
        const response = await new Setting(body).save();
        return response;

    } catch (error) {
        const catchedError = error as IQueryError;
        if (catchedError.code != 11000) {
            console.log(error);
            throw error;
        }
        const err = new Error('Duplicate key error!') as IQueryError;
        err.code = catchedError.code;
        throw err;
    }
};

const getOneByName = async (name: string) => {
    try {
        const response = await Setting.find({name: name});
        return response;
    } catch (error) {
        console.log(error);
    }
}

const editExistingSetting = async (body: ISetting, name: string) => {
    try {
        const response = await Setting.findOneAndUpdate({ name: name }, body, { returnDocument: 'after' });
        return response;
    } catch (error) {
        console.log(error);
    }
}




export {
    addNewSetting,
    getOneByName,
    editExistingSetting
}