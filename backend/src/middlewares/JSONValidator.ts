import { Request, Response, NextFunction } from "express";

const handleJsonError = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        console.log(err)
        return res.status(400).json({ status: 400, statusText: "Bad request", errors: "Received JSON not valid" });
    }

    return next();
}

export default handleJsonError;