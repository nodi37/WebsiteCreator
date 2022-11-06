 import * as yup from 'yup';

const saveNewArtBodySchema = yup.object({
    name: yup.string().min(1).required(),
    content: yup.string(),
    href: yup.string().required(),
    userDate: yup.date(),
    createDate: yup.date(),
    isPublic: yup.boolean(),
    tags: yup.array(),
    galleryImgs: yup.array()
});

const updateArtBodySchema = yup.object({
    _id: yup.string().min(24).max(24).required(),
    name: yup.string().min(1).required(),
    content: yup.string(),
    href: yup.string().required(),
    userDate: yup.date(),
    createDate: yup.date(),
    isPublic: yup.boolean(),
    tags: yup.array(),
    galleryImgs: yup.array()
});

export {
    saveNewArtBodySchema,
    updateArtBodySchema
}
