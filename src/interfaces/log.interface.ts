import { ObjectId } from "mongodb";

export interface Log {
    lastLogin: string; //Fecha en UNIX del login
    timeOnline: Number;  //Tiempo en seg absoluto que ha estado online
    user?: ObjectId[]; //Que usuario ha sido
}