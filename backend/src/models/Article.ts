import mongoose from 'mongoose';
import IArticle from '../interfaces/IArticle';

const ArticleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    href: {
        type: String,
        required: true
    },
    userDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    createDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    isPublic: {
        type: Boolean,
        required: true,
        default: false
    },
    mainImageId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Image'
    },
    galleryImgs: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]
    },
    tags: {
        type: [String],
        required: true
    }
});


const Article = mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;
