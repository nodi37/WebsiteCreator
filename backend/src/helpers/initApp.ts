import firstRunLayoutsCreator from "./initFuncs/firstRunLayoutsCreator";
import createRequiredCatalogs from "./initFuncs/catalogsCreator";
import createAdministratorAccount from "./initFuncs/adminCreator";
import createMainSettings from "./initFuncs/mainSettingsCreator";


function initApp() {
    firstRunLayoutsCreator();
    createRequiredCatalogs();
    createAdministratorAccount();
    createMainSettings();
}

export default initApp;
