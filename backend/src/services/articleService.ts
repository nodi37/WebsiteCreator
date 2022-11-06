import IArticle from '../interfaces/IArticle';
import Article from '../models/Article';
import IQueryError from '../interfaces/IQueryError';
import IParams from '../interfaces/IParams';
import { calculateSkipLimit } from '../helpers/skipLimitCalculator';
import { createQueryObject } from '../helpers/queryObjectCreators';
import { maxResponseCount, filtersDefinition } from '../config/articlesRouteConfig';


const saveNewArticle = async (body: IArticle) => {
    try {
        const response = await new Article(body).save();
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

const editExistingArticle = async (body: IArticle, id: string) => {
    try {
        const response = await Article.findByIdAndUpdate(id, body, { returnDocument: 'after' });
        return response;
    } catch (error) {
        console.log(error);
    }
}

const replaceExistingArticle = async (body: IArticle, id: string) => {
    try {
        const response = await Article.findOneAndReplace({ _id: id }, body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const deleteSingleArticle = async (id: string) => {
    try {
        const response = await Article.findByIdAndDelete(id);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getOneArticleById = async (id: string) => {
    try {
        const response = await Article.findById(id);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getManyArticles = async (params: IParams) => {
    const { skip, limit } = calculateSkipLimit(Number(params.skip), Number(params.limit), maxResponseCount);
    const sortBy = params.sortBy || 'name';
    const sortOrder = params.sortOrder === 'descending' ? '-' : '';
    const queryObject = createQueryObject(Article, filtersDefinition, params);
    console.log(params)
    console.log(queryObject)

    try {
        const response = await Article.find(queryObject).sort(sortOrder + sortBy).skip(skip).limit(limit);
        return response;
    } catch (error) {
        console.log(error);
    }
}


export {
    saveNewArticle,
    editExistingArticle,
    replaceExistingArticle,
    deleteSingleArticle,
    getOneArticleById,
    getManyArticles
};
