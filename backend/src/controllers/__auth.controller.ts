// import { Request, Response } from "express";
// import IUser from "../interfaces/IUser";
// import IUserSettings from "../interfaces/IUserSettings";
// import User from "../models/User";
// import UserSettings from "../models/UserSettings";
// import signByJwt from "../utils/jwt.utils";
// import { isPassRight, genRandomPassword } from "../utils/password.utils";
// import { authCookieConfig } from '../config/authConfig';
// import sendEmail from "../utils/email.utils";
// import newPasswordTemplate from "../templates/emails/newPasswordTemplate";
// import { editExistingUserSettings } from "../services/userSettingsService";

// const login = async (req: Request, res: Response) => {
//     try {
//         const { email, password }: { email: string, password: string } = req.body;
//         const userData = await User.findOne<IUser>({ 'email': email });

//         if (userData) {
//             const userSettings = await UserSettings.findOne<IUserSettings>({userId: userData._id});
//             const authenticated = await isPassRight(password, userSettings!.password);
//             if (authenticated) {
//                 const token = await signByJwt(userData);
//                 res.status(200).cookie('access-token', token, authCookieConfig).json({ 'accessToken': token });
//             } else {
//                 res.status(401).json({ error: 'Wrong credentials' })
//             }
//         } else {
//             res.status(404).json({ error: 'User not found' });
//         }

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

// const logout = async (req: Request, res: Response) => {
//     console.log("Logout requested")
//     res.clearCookie('access-token').json({ success: true });
// }

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

// export {
//     login,
//     logout,
//     resetPassword
// }