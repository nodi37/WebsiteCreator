import mongoose from 'mongoose';
import IUser from '../interfaces/IUser';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    }
});


const User = mongoose.model<IUser>("user", userSchema);

export default User;
