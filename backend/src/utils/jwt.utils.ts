// import Jwt from "jsonwebtoken";
// import { jwtSecret, tokenConfig } from '../config/authConfig'
// import IUser from "../interfaces/IUser";

// const signByJwt = async (payload: IUser): Promise<string> => {
//     const secret = jwtSecret as string;
//     let token = "";
//     try {
//         token = Jwt.sign({ _id: payload._id }, secret, tokenConfig);
//     } catch (error) {
//         console.log(error);
//     }

//     return token;
// }


// export default signByJwt;