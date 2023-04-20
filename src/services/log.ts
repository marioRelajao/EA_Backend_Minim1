import { Types } from "mongoose";
import { Log } from "../interfaces/log.interface";
import LogModel from "../models/log";
import UserModel from "../models/user";

const add_Log = async(item: Log) => {
    const responseItem = await LogModel.create(item);
    return responseItem;
};

const get_Logs = async() => {
    const responseItem = await LogModel.find({}).limit(10);
    return responseItem;
};

const get_Log = async(idLog: string) => {
    const responseItem = await LogModel.findById({_id: idLog});
    return responseItem;
};

const update_Log = async(idLog: string, data: Log) => {
    const responseItem = await LogModel.findByIdAndUpdate({_id: idLog}, data, {new: true});
    return responseItem;
};
//Add the user to the log that generates it?
const add_User = async(idUser: string, idLog: string) => {
    const user = await UserModel.findById({_id: idUser});
    const responseItem = await LogModel.findByIdAndUpdate({_id: idLog},
        {$addToSet: {record: new Types.ObjectId(user?.id)}}, {new: true});
    return responseItem;
};

const delete_log = async(idLog: string) => {
    const responseItem = await LogModel.findByIdAndRemove({_id: idLog});
    return responseItem;
};
 //CRUD fet
export {add_Log, delete_log, add_User, get_Log, get_Logs, update_Log}