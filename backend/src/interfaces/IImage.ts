import { Document, Schema } from "mongoose"

export default interface IImage {
    data: string,
    isFile: Boolean
}

export interface IImageDoc extends IImage, Document { 
    _id: Schema.Types.ObjectId,
};