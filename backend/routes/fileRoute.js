import express from "express";
import { deleteFile, getFiles, updateFiles} from "../controllers/fileController.js";

export const fileRouter = express.Router();

fileRouter.put("/update/newFile/:id", updateFiles)

fileRouter.get("/get/file/:id", getFiles)

fileRouter.delete("/delete/user/:id/file/:fileName", deleteFile)

export default postRouter