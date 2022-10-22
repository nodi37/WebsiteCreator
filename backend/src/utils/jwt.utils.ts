import Jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { jwtSecret, tokenConfig } from '../config/authConfig'
import IUser from "../interfaces/IUser";

const signByJwt = async (payload: IUser): Promise<string> => {
    const secret = jwtSecret as string;
    let token = "";
    try {
        token = Jwt.sign({ _id: payload._id, username: payload.username }, secret, tokenConfig);
    } catch (error) {
        console.log('Error in signByJwt function!')
        console.log(error);
    }
    
    return token;
}

const verifyJwt = async (token: string): Promise<{ decoded?: JwtPayload, valid: boolean }> => {
    try {
        const secret = jwtSecret as Secret;
        const decoded = Jwt.verify(token, secret) as JwtPayload;
        return { decoded: decoded, valid: true };
    } catch (error) {
        return { valid: false };;
    }

}

const decodeJwt = async (token: string): Promise<JwtPayload> => {
    const data = Jwt.decode(token) as JwtPayload;
    return data;
}


export { signByJwt, verifyJwt, decodeJwt };