import { Document } from "mongoose";


export default interface IStatistic {
    name: string,
    value: number
}

export interface IStatisticDoc extends IStatistic, Document {};

 