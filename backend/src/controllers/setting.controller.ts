import { Request, Response } from "express";
import ISetting from "../interfaces/ISetting";
// import ISetting from "../interfaces/ISetting";
// import IQueryError from "../interfaces/IQueryError";
import * as settingService from "../services/settingService";

// const addNewSettingController = async (req: Request, res: Response) => {
//     try {
//         const response = await settingService.addNewSetting(req.body);
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
        const response = await settingService.getOneByName(req.params.name) as ISetting[];

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

const editByNameController = async (req: Request, res: Response) => {
    try {
        const response = await settingService.editExistingSetting(req.body, req.params.name);

        if (response) {
            res.status(200).json({ data: response });
        } else {
            res.status(404).json({ error: "Resource not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export {
    //addNewSettingController,
    getByNameController,
    editByNameController
}
