import IImage from '../interfaces/IImage';
import IQueryError from '../interfaces/IQueryError';
import Image from '../models/Image';
// import IParams from '../interfaces/IParams';
// import { calculateSkipLimit } from '../helpers/skipLimitCalculator';
// import { maxResponseCount, filtersDefinition } from '../config/imagesRouteConfig';
// import { createQueryObject } from '../helpers/queryObjectCreators';
import { deleteFile } from '../utils/fs.utils';


const getOneImage = async (id: string) => {
    try {
        const response = await Image.findById(id);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const addNewImage = async (body: IImage) => {
    try {
        const response = await new Image(body).save();
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

const deleteSingleImage = async (id: string) => {
    try {
        const response = await Image.findByIdAndDelete(id);
        if (response && response.isFile) {
            await deleteFile(response.data);
            for (const img in response.converted) {
                const index = img as keyof typeof response.converted;
                await deleteFile(response.converted[index]);
            }
        };
        return response;
    } catch (error) {
        console.log(error);
    }
};


// const getManyImages = async (params: IParams) => {
//     const { skip, limit } = calculateSkipLimit(Number(params.skip), Number(params.limit), maxResponseCount);
//     const sortBy = params.sortBy || 'name';
//     const sortOrder = params.sortOrder === 'descending' ? '-' : '';
//     const queryObject = createQueryObject(Image, filtersDefinition, params);

//     try {
//         const response = await Image.find(queryObject).sort(sortOrder + sortBy).skip(skip).limit(limit);
//         return response;
//     } catch (error) {
//         console.log(error);
//     }
// }

export {
    getOneImage,
    addNewImage,
    //getManyImages,
    deleteSingleImage
}