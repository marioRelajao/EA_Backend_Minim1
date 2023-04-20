import { Router } from "express";
import { getLog, getLogs, addLog, addUser, updateLog, deleteLog } from "../controllers/log";

const router = Router();

//---------GET-------------
router.get("/get/all", getLogs); //Get all the logs
router.get("/get/:idLog", getLog); //get just that log

//--------POST-------------
router.post("/add", addLog); //Add log
router.post("/add/user/:idUser/:idLog", addUser) //Add an user to that log
router.post("/update/:idLog", updateLog); //Update that log

//--------DELETE-----------
router.delete("/delete/:idLog", deleteLog); //Remove that log

export {router};