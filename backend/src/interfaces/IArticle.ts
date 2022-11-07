import { Schema } from "mongoose";

export default interface IArticle {
    name: string,
    content: string,
    href: string,
    userDate: Date,
    createDate: Date,
    isPublic: boolean,
    tags: [string],
    mainImageId: Schema.Types.ObjectId,
    galleryImgs: [Schema.Types.ObjectId]
}