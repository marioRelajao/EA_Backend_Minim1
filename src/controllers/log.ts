import { Request, Response } from "express";

import { handleHttp } from "../utils/error.handle";
import { add_Log, delete_log, add_User, get_Log, get_Logs, update_Log } from "../services/log";

const getLogs = async(req:Request, res:Response) => {
    try{
        const response = await get_Logs();
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_GET_USERS");
    }
};

const getLog = async({params}:Request, res:Response) => {
    try{
        const {idLog} = params;
        const response = await get_Log(idLog);
        const data = response ? response: "NOT_FOUND";
        res.send(data);
    } catch(e){
        handleHttp(res, "ERROR_GET_USER");
    }
};

const addLog = async({body}:Request, res:Response) => {
    try{
        const response = await add_Log(body);
        res.send(response);
    }catch(e){
        handleHttp(res, "ERROR_SIGNUP");
    }
};

const updateLog = async ({params, body}:Request, res:Response) => {
    try{
        const {idLog} = params;
        const response = await update_Log(idLog, body);
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_UPDATE_USER");
    }
};

const deleteLog = async ({params}:Request, res:Response) => {
    try{
        const {idLog} = params;
        const response = await delete_log(idLog);
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_DELETE_USER");
    }
};

const addUser = async ({params}:Request, res:Response) => {
    try{
        const {idLog, idUser} = params;
        const response = await add_User(idUser, idLog);
        res.send(response);
    }catch(e){
        handleHttp(res, "ERROR_POST_USER");
    }
};

export {addUser, deleteLog, updateLog, addLog, getLog, getLogs};