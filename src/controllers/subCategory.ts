import { Request, Response } from "express";
import models from '../models/index';
import { sendResponse } from '../functions/sendResponse';
import { fileUpload } from "../functions/fileUpload"


export const addSubCategory = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            req?.body?.icon && (req.body.icon = await fileUpload(req?.body?.icon));

            await models?.Subscription.create(req?.body).then((result: any) => {
                sendResponse(res, 201, { data: result });
            }).catch((error: any) => {
                sendResponse(res, 400, { message: error?.message });
            })
        } else {
            sendResponse(res, 400, { message: "Enter a required fields" });
        }
    } catch (error: any) {
        sendResponse(res, 400, { message: error?.message });
    }

}

export const getSubCategory = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            await models?.Subscription.find({ isDeleted: false }).then((result: any) => {
                sendResponse(res, 200, { data: result });
            }).catch((error: any) => {
                sendResponse(res, 400, { message: error?.message });
            })
        } else {
            sendResponse(res, 400, { message: "Enter a required fields" });
        }
    } catch (error: any) {
        sendResponse(res, 400, { message: error?.message });
    }
}

export const updateSubCategory = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            const { _id } = req?.body;

            req?.body?.icon && (req.body.icon = await fileUpload(req?.body?.icon));

            await models?.Subscription.findOneAndUpdate({ _id }, req?.body, { new: true }).then((result: any) => {
                sendResponse(res, 200, { data: result });
            }).catch((error: any) => {
                sendResponse(res, 400, { message: error?.message });
            })

        } else {
            sendResponse(res, 400, { message: "Enter a required fields" });
        }
    } catch (error: any) {
        sendResponse(res, 400, { message: error?.message });
    }
}

export const deleteSubCategory = async (req: any, res: Response) => {
    try {
        if (Object.keys(req?.body).length > 0) {

            const { _id } = req?.body;

            await models?.Subscription.findOneAndUpdate({ _id, isDeleted: false }, { isDeleted: true }).then((result: any) => {
                sendResponse(res, 200, { data: result });
            }).catch((error: any) => {
                sendResponse(res, 400, { message: error?.message });
            })

        } else {
            sendResponse(res, 400, { message: "Enter a required fields" });
        }
    } catch (error: any) {
        sendResponse(res, 400, { message: error?.message });
    }
}