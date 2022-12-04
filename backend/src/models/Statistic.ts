import mongoose from 'mongoose';
import IStatistic from '../interfaces/IStatistic';

const StatisticSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
});


const Statistic = mongoose.model<IStatistic>("Statistic", StatisticSchema);

export default Statistic;
