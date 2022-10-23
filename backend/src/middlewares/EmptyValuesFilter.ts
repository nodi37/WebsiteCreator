import { Request, Response, NextFunction } from "express";

const emptyFieldsFilter = function (req: Request, res: Response, next: NextFunction) {
    const filteredBody = Object.fromEntries(Object.entries(req.body).filter(([_, v])=>filterFunc(v)));
    const filteredQuery = Object.fromEntries(Object.entries(req.query).filter(([_, v])=>filterFunc(v)));
    const filteredParams = Object.fromEntries(Object.entries(req.params).filter(([_, v])=>filterFunc(v)));
    
    req.body = filteredBody;
    req.query = filteredQuery;
    req.params = filteredParams;

    return next();
}

function filterFunc(value: any): boolean {
    if (typeof value == 'string' || typeof value == 'boolean' || typeof value == 'number') return true;
    return !!value;
}

export default emptyFieldsFilter;


