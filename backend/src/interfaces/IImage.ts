import { Document, Schema } from "mongoose"

export default interface IImage {
    data: string,
    converted: IConvertedImgs,
    isFile: Boolean
}

export interface IImageDoc extends IImage, Document { 
    _id: Schema.Types.ObjectId,
};

interface IConvertedImgs {
    mini: string,
    medium: string,
    large: string,
    xlarge: string
}