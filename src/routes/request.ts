import express from "express";
const router = express.Router();
import { authUsers, authAdmin, authLabour, authContractor, authGeneral } from "../middleware/auth";
import { addRequest, getRequest, updateRequest, deleteRequest } from "../controllers/request";

router.post('/add', authGeneral, addRequest);

router.post('/get', authGeneral, getRequest);

router.put('/update', authGeneral, updateRequest);

router.delete('/delete/:id', authGeneral, deleteRequest);

export default router;