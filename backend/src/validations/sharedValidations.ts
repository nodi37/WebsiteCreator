 import * as yup from 'yup';

const idParamSchema = yup.object({
    id: yup.string().min(24).max(24).required(),
});

const chunkingSystemBodySchema = yup.object({
    taskId: yup.string(),
    isChunked: yup.boolean(),
    chunk: yup.string(), 
    size: yup.number().min(1), 
});

export {
    idParamSchema,
    chunkingSystemBodySchema,
}