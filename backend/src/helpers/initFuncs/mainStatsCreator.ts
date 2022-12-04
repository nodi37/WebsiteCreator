import IStatistic from "../../interfaces/IStatistic";
import Statistic from "../../models/Statistic";
import { addNewStatistic } from "../../services/statisticsService";

async function createMainStatistics() {
    try {
        const setingsCount = await Statistic.count();

        if (setingsCount < 1) {
            console.log('[StatisticsCreator] No basic statistics! Creating...');

            //I will move this to config file later
            const visitsCount: IStatistic = {
                name: 'visitsCount',
                value: 0
            }

            await addNewStatistic(visitsCount);

            console.log(`[StatisticsCreator] Basic Statistics created!`);
        }
    } catch (error) {
        console.log(error);
        console.log('[StatisticsCreator] Function error!');
    }

}

export default createMainStatistics;