import { Schema, model } from "mongoose";

import { Log } from "../interfaces/log.interface";

const LogSchema = new Schema<Log>(
    {
        lastLogin: {
            type: String,
            required: true,
        },
        timeOnline: {
            type: Number,
            required: true,
        },
        user: {
            type: [Schema.Types.ObjectId],
            ref: 'users',
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const LogModel = model('log', LogSchema);
export default LogModel;
