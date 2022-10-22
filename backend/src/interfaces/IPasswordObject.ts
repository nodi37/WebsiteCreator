import IPasswordHash from "./IPasswordHash";

interface IPasswordsObj {
    passwordPlain: string;
    passwordHash: IPasswordHash;
}

export default IPasswordsObj;