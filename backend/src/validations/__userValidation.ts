//  import * as yup from 'yup';

// //Partial
// const employeeOfObj = yup.object({
//     companyId: yup.string().min(24).max(24).required(),
//     hourlyRate: yup.number().positive().required(),
//     defTotalBreakTime: yup.number().positive().required(),
//     settlementMethod: yup.number().positive().min(0).max(1).required(),
//     stdHrsPerDay: yup.number().positive().required(),
//     overtimeAllowance: yup.number().positive().min(0).max(1).required(), //% 0-1
//     freeDaysAllowance: yup.number().positive().min(0).max(1).required(), //% 0-1
// });

// //

// //Main
// const addUserSchema = yup.object({
//     name: yup.string().required(),
//     lastName: yup.string(),
//     employeeOf: yup.array().of(employeeOfObj),
//     email: yup.string().email().required(),
//     password: yup.string().min(8).max(128),
//     phoneNmber: yup.number().positive().integer(),
//     privligeLvl: yup.number().positive().integer().min(1).max(3).required(),
//     photo: yup.string(),
// });

// const editUserSchema = yup.object({
//     name: yup.string(),
//     lastName: yup.string(),
//     employeeOf: yup.array().of(employeeOfObj),
//     email: yup.string().email(),
//     password: yup.string().min(8).max(128),
//     phoneNumber: yup.number().positive().integer(),
//     privligeLvl: yup.number().positive().integer().min(1).max(3),
//     photo: yup.string(),
// });

// const getManyUsersSchema = yup.object({
//     skip: yup.number().positive().integer(),
//     limit: yup.number().positive().integer(),
//     employeeOf: yup.string().min(24).max(24),
//     keyword: yup.string(),
//     sortBy: yup.string(),
//     sortOrder: yup.string().matches(new RegExp('descending'), 'SortOrder accepts only >descending< keyword, use it to reverse sorting')
// });



// export {
//     addUserSchema,
//     editUserSchema,
//     getManyUsersSchema
// }