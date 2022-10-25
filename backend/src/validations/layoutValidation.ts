 import * as yup from 'yup';

const nameParamSchema = yup.object({
    name: yup.string().required(),
});

const saveNewLayoutBodySchema = yup.object({
    name: yup.string().min(1).max(24).required(),
    components: yup.array()
});

const updateLayoutBodySchema = yup.object({
    _id: yup.string().min(24).max(24).required(),
    name: yup.string().min(1).max(24).required(),
    components: yup.array()
});

const getManyQuerySchema = yup.object({
    name: yup.string().min(1).max(48),
    isGlobal: yup.boolean(),
    isRequired: yup.boolean(),
    skip: yup.number().positive().integer(),
    limit: yup.number().positive().integer(),
    keyword: yup.string(),
    sortBy: yup.string(),
    sortOrder: yup.string().matches(new RegExp('descending'), 'SortOrder accepts only >descending< keyword, use it to reverse sorting')
});


export {
    nameParamSchema,
    saveNewLayoutBodySchema,
    updateLayoutBodySchema,
    getManyQuerySchema
}
