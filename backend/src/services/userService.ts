// import { maxResponseCount, filtersDefinition } from '../config/userRequestConfig';
// import { calculateSkipLimit } from '../helpers/skipLimitCalculator';
// import { createQueryObject } from '../helpers/queryObjectCreators';
// import sendEmail from '../utils/email.utils';
// import newPasswordTemplate from '../templates/emails/newPasswordTemplate';

import User from '../models/User';
import IUser from '../interfaces/IUser';
import IQueryError from '../interfaces/IQueryError';

const saveNewUser = async (body: IUser) => {
    try {
        const { username, passwordHash } = body;
        const response = await new User({ username: username, passwordHash: passwordHash }).save();
        
        // const emailSubject = 'Your account in Delator has been created';
        // await sendEmail(newPasswordTemplate(passwords.passwordPlain), emailSubject, email);
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


// const editExistingUser = async (body: IUser, id: string) => {
//     try {
//         const response = await User.findByIdAndUpdate(id, body, { returnDocument: 'after' });
//         return response;
//     } catch (error) {
//         console.log(error);
//     }
// }

// const replaceExistingUser = async (body: IUser, id: string) => {
//     try {
//         const response = await User.findOneAndReplace({ _id: id }, body);
//         return response;
//     } catch (error) {
//         console.log(error);
//     }
// }

// const deleteSingleUser = async (id: string) => {
//     try {
//         const response = await User.findByIdAndDelete(id);
//         return response;
//     } catch (error) {
//         console.log(error);
//     }
// }

// const getOneUser = async (id: string) => {
//     try {
//         const response = await User.findById(id);
//         return response;
//     } catch (error) {
//         console.log(error);
//     }
// }

// const getManyUsers = async (params: IParams) => {
//     const { skip, limit } = calculateSkipLimit(Number(params.skip), Number(params.limit), maxResponseCount);
//     const sortBy = params.sortBy || 'name';
//     const sortOrder = params.sortOrder === 'descending' ? '-' : '';
//     const queryObject = createQueryObject(User, filtersDefinition, params);

//     try {
//         const response = await User.find(queryObject).sort(sortOrder + sortBy).skip(skip).limit(limit);
//         return response;
//     } catch (error) {
//         console.log(error);
//     }
// }


export {
    saveNewUser,
    //     editExistingUser,
    //     replaceExistingUser,
    //     deleteSingleUser,
    //     getOneUser,
    //     getManyUsers
};
