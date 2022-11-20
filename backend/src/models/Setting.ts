import mongoose from 'mongoose';
import ISetting from '../interfaces/ISetting';

const SettingSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    value: {
        type: String,
        required: true
    },
});


const Setting = mongoose.model<ISetting>("setting", SettingSchema);

export default Setting;
