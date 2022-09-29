import yup from 'yup';
import { NextFunction, Request, Response } from 'express';

const validateRequestBody = (schema: yup.ObjectSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const striped = await schema.cast(req.body, { stripUnknown: true });
        await schema.validate(striped);
        req.body = striped;
        return next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: 400, statusText: "Bad request", errors: error });
    }
}

const validateRequestParams = (schema: yup.ObjectSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        const striped = await schema.cast(req.params, { stripUnknown: true });
        await schema.validate(striped);
        req.params = striped;
        return next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: 400, statusText: "Bad request", errors: error });
    }
}

const validateRequestQuery = (schema: yup.ObjectSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const striped = await schema.cast(req.query, { stripUnknown: true });
        await schema.validate(striped);
        req.query = striped;
        return next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: 400, statusText: "Bad request", errors: error });
    }
}

export { validateRequestBody, validateRequestParams, validateRequestQuery };
