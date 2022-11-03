 import * as yup from 'yup';
import { NextFunction, Request, Response } from 'express';

const validateRequestBody = (schema: yup.ObjectSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {

        const striped = schema.noUnknown().cast(req.body);
        await schema.validate(striped);

        req.body = striped;
        return next();

    } catch (error) {
        //console.log(error);
        return res.status(400).json({ status: 400, statusText: "Bad request", error: error });
    }
}

const validateRequestParams = (schema: yup.ObjectSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        const striped = schema.noUnknown().cast(req.params);
        await schema.validate(striped);
        req.params = striped;
        return next();
    } catch (error) {
        // console.log(error);
        return res.status(400).json({ status: 400, statusText: "Bad request", error: error });
    }
}

const validateRequestQuery = (schema: yup.ObjectSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const striped = schema.noUnknown().cast(req.query);
        await schema.validate(striped);
        req.query = striped;
        return next();
    } catch (error) {
        //console.log(error);
        return res.status(400).json({ status: 400, statusText: "Bad request", error: error });
    }
}

export { validateRequestBody, validateRequestParams, validateRequestQuery };
