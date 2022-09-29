import mongoose from 'mongoose';
import IComponent from '../interfaces/IComponent';

const ComponentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    props: {
        type: Object,
        required: true,
    }
});


const Component = mongoose.model<IComponent>("Component", ComponentSchema);

export default Component;
