import { MongooseError } from "mongoose";

export default interface IQueryError extends MongooseError {
    code: number
}