 import * as yup from 'yup';

const idParamSchema = yup.object({
    id: yup.string().min(24).max(24).required(),
});

const chunk = yup.object({
    data: yup.string(),
    order: yup.number()
});

const chunkingSystemBodySchema = yup.object().shape({
    taskId: yup.string(),
    isChunked: yup.boolean(),
    chunk: chunk, 
    size: yup.number().min(1), 
});



export {
    idParamSchema,
    chunkingSystemBodySchema,
}