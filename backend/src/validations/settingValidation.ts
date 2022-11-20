import * as yup from 'yup';

const nameParamSchema = yup.object({
    name: yup.string().min(1).required(),
});

const settingBodySchema = yup.object({
    name: yup.string().min(1).required(),
    value: yup.string().min(1).required(),
});

export {
    nameParamSchema,
    settingBodySchema
};

