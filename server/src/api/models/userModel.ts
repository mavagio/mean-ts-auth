import mongoose = require('mongoose');
import {Schema, Document} from 'mongoose';

export interface IUser {
    local            : {
        email        : string,
        password     : string,
    };
    facebook         : {
        id           : string,
        token        : string,
        name         : string,
        email        : string
    };
    twitter          : {
        id           : string,
        token        : string,
        displayName  : string,
        username     : string
    };
    google           : {
        id           : string,
        token        : string,
        email        : string,
        name         : string
    }
}

const UserSchema: Schema = new Schema({
    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

export interface IUserModel extends IUser, Document {
}

const UserModel = mongoose.model<IUserModel>('User', UserSchema);

export default UserModel;


