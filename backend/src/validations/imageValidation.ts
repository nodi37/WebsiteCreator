import * as yup from 'yup';
import { chunkingSystemBodySchema } from './sharedValidations';

const addImgBodySchema = chunkingSystemBodySchema.shape({
    image: yup.string(),
    toFile: yup.boolean()
});

const getImgQuerySchema = yup.object({
    size: yup.string().matches(/(mini|medium|large)/, 'Accepts mini, medium or large keywords!')
});

export {
    addImgBodySchema,
    getImgQuerySchema
}