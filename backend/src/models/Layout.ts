import mongoose from 'mongoose';
import iLayout from '../interfaces/ILayout';

const LayoutSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    components: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Component' }]
    },
    isGlobal: {
        type: Boolean,
        required: true,
        default: false
    },
    isRequired: {
        type: Boolean,
        required: true,
        default: false
    }
});


const Layout = mongoose.model<iLayout>("Layout", LayoutSchema);

export default Layout;
