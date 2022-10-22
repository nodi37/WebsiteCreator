import bcrypt from 'bcrypt';
import generator from 'generate-password';
import { passwordConfig, saltRounds } from '../config/authConfig';
import IPasswordsObj from '../interfaces/IPasswordObject';
import IPasswordHash from '../interfaces/IPasswordHash';


const genRandomPassword = async (): Promise<IPasswordsObj> => {
    let password = "";
    let hash: IPasswordHash = "";

    try {
        password = generator.generate(passwordConfig);
        hash = await encryptPassword(password);
    } catch (error) {
        console.log(error)
    }

    return {
        passwordPlain: password,
        passwordHash: hash 
    }
}



const isPassRight = async (passwordPlain: string, passwordHash: IPasswordHash): Promise<boolean> => {
    let result = false;
    const hash = passwordHash as string;

    try {
        result = await bcrypt.compare(passwordPlain, hash);
    } catch (error) {
        console.log(error);
    }

    return result;
}



const encryptPassword = async (passwordPlain: string): Promise<IPasswordHash> => {
    let hash: IPasswordHash = "";

    try {
        hash = await bcrypt.hash(passwordPlain, saltRounds);
    } catch (error) {
        console.log(error)
    }

    return hash;
}



export { genRandomPassword, encryptPassword, isPassRight };