import { maxResponseCount, filtersDefinition } from '../config/layoutConfig';
import { calculateSkipLimit } from '../helpers/skipLimitCalculator';
import { createQueryObject } from '../helpers/queryObjectCreators';
import ILayout from '../interfaces/ILayout';
import Layout from '../models/Layout';
import IQueryError from '../interfaces/IQueryError';
import IParams from '../interfaces/IParams';


const saveNewLayout = async (body: ILayout) => {
    try {
        const response = await new Layout(body).save();
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

const editExistingLayout = async (body: ILayout, id: string) => {
    try {
        const response = await Layout.findByIdAndUpdate(id, body, { returnDocument: 'after' });
        return response;
    } catch (error) {
        console.log(error);
    }
}

const replaceExistingLayout = async (body: ILayout, id: string) => {
    try {
        const response = await Layout.findOneAndReplace({ _id: id }, body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const deleteSingleLayout = async (id: string) => {
    try {
        const response = await Layout.findByIdAndDelete(id);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getOneLayout = async (id: string) => {
    try {
        const response = await Layout.findById(id);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getManyLayouts = async (params: IParams) => {
    const { skip, limit } = calculateSkipLimit(Number(params.skip), Number(params.limit), maxResponseCount);
    const sortBy = params.sortBy || 'name';
    const sortOrder = params.sortOrder === 'descending' ? '-' : '';
    const queryObject = createQueryObject(Layout, filtersDefinition, params);

    try {
        const response = await Layout.find(queryObject).sort(sortOrder + sortBy).skip(skip).limit(limit);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getPopulatedLayoutByName = async (layoutName: String) => {
    try {
        const response = await Layout.find({name: layoutName}).populate('components');
        return response;
    } catch (error) {
        console.log(error);
    }
}


export {
    saveNewLayout,
    editExistingLayout,
    replaceExistingLayout,
    deleteSingleLayout,
    getOneLayout,
    getManyLayouts,
    getPopulatedLayoutByName
};
