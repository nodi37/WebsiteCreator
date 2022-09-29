import bcrypt from 'bcrypt';
import generator from 'generate-password';
import { passwordConfig, saltRounds } from '../config/authConfig';

interface IRandomPass {
    passwordPlain: string;
    passwordHash: string;
}

const genRandomPassword = async (): Promise<IRandomPass> => {
    let password = "";
    let hash = "";

    try {
        password = generator.generate(passwordConfig);
        hash = await bcrypt.hash(password, saltRounds);
    } catch (error) {
        console.log(error)
    }

    return {
        passwordPlain: password,
        passwordHash: hash
    }
}



const isPassRight = async (passwordPlain: string, passwordHash: string): Promise<boolean> => {
    let result = false;

    try {
        result = await bcrypt.compare(passwordPlain, passwordHash);
    } catch (error) {
        console.log(error);
    }

    return result;
}



const encryptPassword = async (passwordPlain: string): Promise<string> => {
    let hash: string = "";

    try {
        hash = await bcrypt.hash(passwordPlain, saltRounds);
    } catch (error) {
        console.log(error)
    }

    return hash;
}



export { genRandomPassword, encryptPassword, isPassRight };