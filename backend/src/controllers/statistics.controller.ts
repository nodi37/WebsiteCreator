import { Request, Response } from "express";
import IStatistic from "../interfaces/IStatistic";
// import Istatistic from "../interfaces/Istatistic";
// import IQueryError from "../interfaces/IQueryError";
import * as statisticsService from "../services/statisticsService";

// const addNewstatisticController = async (req: Request, res: Response) => {
//     try {
//         const response = await statisticService.addNewstatistic(req.body);
//         res.status(201).json({ data: response });
//     } catch (error) {
//         const err = error as IQueryError
//         if (err.code != 11000) {
//             console.log(error);
//         }
//         if (err.code === 11000) {
//             res.status(409).json({ error: "Conflict" });
//         } else {
//             res.status(500).json({ error: "Internal Server Error" });
//         }
//     }
// }

const getByNameController = async (req: Request, res: Response) => {
    try {
        const response = await statisticsService.getOneByName(req.params.name) as IStatistic[];

        if (!!response[0]) {
            res.status(200).json({ data: response[0] });
        } else {
            res.status(404).json({ error: "Resource not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const increaseByNameController = async (req: Request, res: Response) => {
    try {
        const response = await statisticsService.increaseOneByName(req.params.name);

        if (!!response) {
            res.status(200).json({ success: true });
        } else {
            res.status(404).json({ error: "Resource not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// const editByNameController = async (req: Request, res: Response) => {
//     try {
//         const response = await statisticsService.editExistingStatistic(req.body, req.params.name);

//         if (response) {
//             res.status(200).json({ data: response });
//         } else {
//             res.status(404).json({ error: "Resource not found" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

export {
    //addNewstatisticController,
    getByNameController,
    increaseByNameController,
    //editByNameController
}
