 import * as yup from 'yup';

const saveNewCompBodySchema = yup.object({
    name: yup.string().min(1).max(24).required(),
    order: yup.number().min(0).required(),
    props: yup.object()
});

const updateCompBodySchema = yup.object({
    _id: yup.string().min(24).max(24).required(),
    name: yup.string().min(1).max(24).required(),
    order: yup.number().min(0),
    props: yup.object().noUnknown(false)
});




export {
    saveNewCompBodySchema,
    updateCompBodySchema
}
