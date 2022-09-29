import mongoose from 'mongoose';
import IImage from '../interfaces/IImage';

const imageSchema = new mongoose.Schema({
    data: { type: String },
    isFile: {
        type: Boolean,
        required: true,
        default: false
    }
});


const Image = mongoose.model<IImage>("Image", imageSchema);

export default Image;
