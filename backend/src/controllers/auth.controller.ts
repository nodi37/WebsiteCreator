import { Request, Response } from "express";
import IUser from "../interfaces/IUser";
import User from "../models/User";
import { signByJwt, decodeJwt } from "../utils/jwt.utils";
import { isPassRight } from "../utils/password.utils";
import { authCookieConfig } from '../config/authConfig';

// import sendEmail from "../utils/email.utils";
// import newPasswordTemplate from "../templates/emails/newPasswordTemplate";


const login = async (req: Request, res: Response) => {
    try {
        const { username, password }: { username: string, password: string } = req.body;
        const userData = await User.findOne<IUser>({ 'username': username });

        if (userData) {

            const authenticated = await isPassRight(password, userData.passwordHash);

            if (authenticated) {
                const token = await signByJwt(userData);
                res.status(200).cookie('access-token', token, authCookieConfig).json({ 'accessToken': token });
            } else {
                res.status(401).json({ error: 'Wrong credentials' });
            }
        } else {
            res.status(200).json({ error: 'User not found' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const logout = async (req: Request, res: Response) => {
    res.clearCookie('access-token').json({ success: true });
}

const verify = async (req: Request, res: Response) => {
    try {
        const data = await decodeJwt(req.signedCookies['access-token']);
        const userData = await User.findOne<IUser>({ '_id': data._id }) as IUser;
        const token = await signByJwt(userData);
        res.status(200).cookie('access-token', token, authCookieConfig).json({ 'accessToken': token });
    } catch (error) {
        res.status(500).json({error: 'Server error!'});
    }

}

// const resetPassword = async (req: Request, res: Response) => {
//     try {
//         const { email }: { email: string } = req.body;
//         const userData = await User.findOne<IUser>({ 'email': email });

//         if (!!userData) {
//             const settingsId = userData.settingsId as string;

//             const passwords = await genRandomPassword();
//             await editExistingUserSettings({ password: passwords.passwordHash }, settingsId);

//             const emailSubject = 'Your password in Delator has been reset'
//             await sendEmail(newPasswordTemplate(passwords.passwordPlain), emailSubject, email);

//             res.status(200).json({ success: true });
//         } else {
//             res.status(404).json({ error: 'User not found' });
//         }

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

export {
    login,
    logout,
    verify
    //resetPassword
}