import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";

const checkAuth = async function (req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.signedCookies['access-token']) throw Error;
        const verify = await verifyJwt(req.signedCookies['access-token']);
        if (!verify.valid) throw Error;
        return next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

export default checkAuth;