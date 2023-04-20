import { Types } from "mongoose";

import { User } from '../interfaces/user.interface';
import UserModel from "../models/user";
import ChallengeModel from "../models/user";

const get_Users = async() => {
    const responseItem = await UserModel.find({}).limit(10);
    return responseItem;
};

const get_User = async(idUser: string) => {
    const responseItem = await UserModel.findById({_id: idUser});
    return responseItem;
};

const get_UserCount = async() => {
    const responseItem = await UserModel.find({}).count();
    return responseItem;
};

const get_UsersProfile = async() => {
    const responseItem = await UserModel.find({}, {name: 0, surname: 0, 
        email: 0, password: 0, role: 0, active: 0}).limit(20);
    return responseItem;
};

const get_UserProfile = async(idUser: string) => {
    const responseItem = await UserModel.findById({_id: idUser}, {name: 0, surname: 0, 
        email: 0, password: 0, role: 0, active: 0}); //Ignore those properties
    return responseItem;
};

const log_in = async(email: string, password: string) => {
    const user = await UserModel.findOne({email: email}, {password: password});
    const responseItem = await UserModel.findById({_id: user?.id}, {name: 0, surname: 0, 
        email: 0, password: 0, role: 0, active: 0})
    return responseItem;
};

const sign_up = async(item: User) => {
    if(!item.role) { item.role = "user"; } //If role is not specified then role = "user";
    item.active = true;
    const responseItem = await UserModel.create(item);
    return responseItem;
};

const update_User = async(idUser: string, data: User) => {
    const responseItem = await UserModel.findByIdAndUpdate({_id: idUser}, data, {new: true});
    return responseItem;
};

const add_Follow = async(idUser: string, idFollowed: string) => {
    const user = await UserModel.findById({_id: idUser}); //Person who is following
    const followed = await UserModel.findById({_id: idFollowed}); //Person being followed
    const responseItem = await UserModel.findByIdAndUpdate({_id: idUser}, 
        {$addToSet: {following: new Types.ObjectId(followed?.id)}}, {new: true}) 
        && UserModel.findByIdAndUpdate({_id: idFollowed}, 
        {$addToSet: {followers: new Types.ObjectId(user?.id)}}, {new: true});
    return responseItem;
};

const delete_Follow = async(idUser: string, idFollowed: string) => {
    const user = await UserModel.findById({_id: idUser}); //Person who is following
    const followed = await UserModel.findById({_id: idFollowed}); //Person being followed
    const responseItem = await UserModel.findByIdAndUpdate({_id: idUser}, 
        {$pull: {following: new Types.ObjectId(followed?.id)}}, {new: true}) 
        && UserModel.findByIdAndUpdate({_id: idFollowed}, 
        {$pull: {followers: new Types.ObjectId(user?.id)}}, {new: true});
    return responseItem;
};

const add_Challenge = async(idUser: string, idChallenger: string) => {
    const challenge = await ChallengeModel.findById({_id: idChallenger});
    const responseItem = await UserModel.findByIdAndUpdate({_id: idUser},
        {$addToSet: {record: new Types.ObjectId(challenge?.id)}}, {new: true});
    return responseItem;
};

const disable_User = async(idUser: string) => {
    const responseItem = await UserModel.findByIdAndUpdate({_id: idUser}, 
        {active: false}, {new: true});
    return responseItem;
};

const delete_User = async(idUser: string) => {
    const responseItem = await UserModel.findByIdAndRemove({_id: idUser});
    return responseItem;
};

export { get_Users, get_User, get_UserCount, get_UsersProfile, get_UserProfile, log_in, 
    sign_up, update_User, add_Follow, delete_Follow, add_Challenge, disable_User, delete_User };
