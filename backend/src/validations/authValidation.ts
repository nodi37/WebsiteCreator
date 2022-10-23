import * as yup from 'yup';

const loginSchema = yup.object({
    username: yup.string().min(1).required(),
    password: yup.string().min(1).required(),
});

export {
    loginSchema,
}