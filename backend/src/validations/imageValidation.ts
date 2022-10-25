 import * as yup from 'yup';
import { chunkingSystemBodySchema } from './sharedValidations';

const addImgBodySchema = chunkingSystemBodySchema.shape({
    image: yup.string()
});

export {
    addImgBodySchema,
}