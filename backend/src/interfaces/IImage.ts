import { Schema } from "mongoose"

export default interface IImage {
    _id?: Schema.Types.ObjectId,
    data: string,
    isFile: Boolean
}