import mongoose = require('mongoose');
import {Schema, Document} from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

export interface IUser {
    local: {
        email: string,
        password: string,
    };
    facebook: {
        id: string,
        token: string,
        name: string,
        email: string,
    };
    twitter: {
        id: string,
        token: string,
        displayName: string,
        username: string,
    };
    google: {
        id: string,
        token: string,
        email: string,
        name: string,
    };
}

const UserSchema: Schema = new Schema({
    local: {
        email: String,
        password: String,
    },
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String,
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String,
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String,
    },
});

export interface IUserModel extends IUser, Document {
}

// generating a hash
UserSchema.methods.generateHash = (password: any) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// checking if password is valid
UserSchema.methods.validPassword = function(password: any) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app

export const UserModule = mongoose.model<any>('User', UserSchema);
