import { Schema } from 'mongoose';
import IPasswordHash from './IPasswordHash';

export default interface IUser {
    _id?: Schema.Types.ObjectId,
    username: string,
    passwordHash: IPasswordHash
}