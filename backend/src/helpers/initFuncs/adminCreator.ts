import User from "../../models/User";
import { saveNewUser } from "../../services/userService";
import { encryptPassword, genRandomPassword } from "../../utils/password.utils";
import IPasswordsObj from "../../interfaces/IPasswordObject";

async function createAdministratorAccount() {

    try {
        const usersCount = await User.count();

        if (usersCount < 1) {

            console.log('[AdminCreator] Administrator user doesnt exist! Creating new one...');

            const defUserName = process.env.SU_NAME;
            const defPass = process.env.SU_PASSWORD;

            let randomPasswords: IPasswordsObj = {
                passwordPlain: '',
                passwordHash: ''
            }

            if (!defPass) {
                console.log('[AdminCreator] Password has not been predefined! Creating password...');
                randomPasswords = await genRandomPassword();
            }

            const nameToSave = !defUserName ? 'admin' : defUserName;
            const passwordToSave = !defPass ? randomPasswords.passwordHash : await encryptPassword(defPass);

            await saveNewUser({
                username: nameToSave,
                passwordHash: passwordToSave
            });

            console.log(`[AdminCreator] Admin has been created! [Username: ${nameToSave}], [Password: ${!defPass ? randomPasswords.passwordPlain : defPass}]`);
        }
    } catch (error) {
        console.log(error);
        console.log('[AdminCreator] Function error!');
    }

}

export default createAdministratorAccount;