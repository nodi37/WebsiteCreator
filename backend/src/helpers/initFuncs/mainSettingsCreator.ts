import ISetting from "../../interfaces/ISetting";
import Setting from "../../models/Setting";
import { addNewSetting } from "../../services/settingService";

async function createMainSettings() {
        try {
            const setingsCount = await Setting.count();

            if (setingsCount < 2) {
                console.log('[SettingsCreator] No basic settings! Creating...');

                //I will move this to config file later
                const languageSetting: ISetting = {
                    name: 'language',
                    value: 'en'
                }

                const websiteTitleSetting: ISetting = {
                    name: 'websiteTitle',
                    value: 'My Website'
                }

                await addNewSetting(languageSetting);
                await addNewSetting(websiteTitleSetting);

                console.log(`[SettingsCreator] Basic settings created!`);
            }
        } catch (error) {
            console.log(error);
            console.log('[SettingsCreator] Function error!');
        }

    }

export default createMainSettings;