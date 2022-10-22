import firstRunLayoutsCreator from "./initFuncs/firstRunLayoutsCreator";
import createRequiredCatalogs from "./initFuncs/catalogsCreator";
import createAdministratorAccount from "./initFuncs/adminCreator";


function initApp() {
    firstRunLayoutsCreator();
    createRequiredCatalogs();
    createAdministratorAccount();
}

export default initApp;
