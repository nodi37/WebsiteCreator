import IQueryError from '../interfaces/IQueryError';
import IStatistic, { IStatisticDoc } from '../interfaces/IStatistic';
import Statistic from '../models/Statistic';


const addNewStatistic = async (body: IStatistic) => {
    try {
        const response = await new Statistic(body).save();
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
        const response = await Statistic.find({name: name});
        return response;
    } catch (error) {
        console.log(error);
    }
}

const increaseOneByName = async (name: string): Promise<IStatisticDoc | undefined> => {
    try {
        const response = await Statistic.findOneAndUpdate({name: name}, {$inc:{'value': 1}}) as IStatisticDoc;
        return response;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

// const editExistingStatistic = async (body: IStatistic, name: string) => {
//     try {
//         const response = await Statistic.findOneAndUpdate({ name: name }, body, { returnDocument: 'after' });
//         return response;
//     } catch (error) {
//         console.log(error);
//     }
// }




export {
    addNewStatistic,
    getOneByName,
    increaseOneByName,
    //editExistingStatistic
}