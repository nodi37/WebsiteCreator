import firstRunLayoutsCreator from "./initFuncs/firstRunLayoutsCreator";
import createRequiredCatalogs from "./initFuncs/catalogsCreator";
import createAdministratorAccount from "./initFuncs/adminCreator";
import createMainSettings from "./initFuncs/mainSettingsCreator";
import createMainStatistics from "./initFuncs/mainStatsCreator";


function initApp() {
    firstRunLayoutsCreator();
    createRequiredCatalogs();
    createAdministratorAccount();
    createMainSettings();
    createMainStatistics();
}

export default initApp;
