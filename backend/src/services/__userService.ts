// import { maxResponseCount, filtersDefinition } from '../config/userRequestConfig';
// import { defaultAppLanguage } from '../config/AppConfig';
// import { genRandomPassword } from '../utils/password.utils';
// import { calculateSkipLimit } from '../helpers/skipLimitCalculator';
// import { createQueryObject } from '../helpers/queryObjectCreators';
// import User from '../models/User';
// import { saveNewUserSettings } from '../services/userSettingsService';
// import IQueryError from '../interfaces/IQueryError';
// import IParams from '../interfaces/IParams';
// import newPasswordTemplate from '../templates/emails/newPasswordTemplate';
// import sendEmail from '../utils/email.utils';
// import IUser from '../interfaces/IUser';
// import IUserSettings from '../interfaces/IUserSettings';

// interface IBody {
//     profile: IUser;
//     settings: IUserSettings;
// }

// const saveNewUser = async (body: IBody) => {
//     try {
//         const { name, lastName, email, phoneNumber, photo } = body.profile;
//         const language = !!body.settings ? body.settings.language : defaultAppLanguage;
//         const superUser = !!body.settings ? body.settings.superUser : false;
//         const passwords = await genRandomPassword();

//         const settingsBody: IUserSettings = {
//             password: passwords.passwordHash,
//             language: language || 'no',
//             superUser: superUser || false
//         }

//         const userSettings = await saveNewUserSettings(settingsBody)
//         const settingsId = userSettings._id;

//         const response = await new User({ name, lastName, email, phoneNumber, photo, settingsId }).save();

//         const emailSubject = 'Your account in Delator has been created';
//         await sendEmail(newPasswordTemplate(passwords.passwordPlain), emailSubject, email);

//         return response;
//     } catch (error) {
//         const catchedError = error as IQueryError;
//         if (catchedError.code != 11000) {
//             console.log(error);
//         }
//         const err = new Error('Duplicate key error!') as IQueryError;
//         err.code = catchedError.code;
//         throw err;
//     }
// };


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


// export {
//     saveNewUser,
//     editExistingUser,
//     replaceExistingUser,
//     deleteSingleUser,
//     getOneUser,
//     getManyUsers
// };
