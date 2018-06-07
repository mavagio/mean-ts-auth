import {Model} from 'mongoose';
import * as testModel from '../models/testModel';
import {UserModule, IUserModel} from '../models/userModel';

import TestController from './testController';
import UserController from './userController';

import * as path from 'path';
import * as jwt from 'jsonwebtoken';

module.exports = (passport: any) => {
    const testCtrl = new TestController<Model<testModel.ITestModel>>(testModel.default);
    const userCtrl = new UserController<Model<IUserModel>>(UserModule);

    const publicModule: any = {};

    publicModule.home_get = (req: any, res: any, next: any) => {
        res.sendFile(path.resolve('public/index.html'));
    };

    /**
     * Session based login functionality
     * */
    publicModule.session_login_post = (req: any, res: any, next: any) => {
        passport.authenticate('local-login', {session: true}, (err: any, user: any, info: any) => {
            if (err) {
                return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting signup
            if (!user) {
                return res.send({success: false, message: 'login failed'});
            }

            req.login(user, {session: true}, (err2: any) => {
                if (err2) {
                    res.send(err2);
                }
                return res.json({success: true, user});
            });
        })(req, res);
    };

    /**
     * JWT token based login functionality
     * */
    publicModule.jwt_login_post = (req: any, res: any, next: any) => {
        passport.authenticate('local-login', {session: false}, (err: any, user: any, info: any) => {
            if (err) {
                return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting signup
            if (!user) {
                return res.send({success: false, message: 'login failed'});
            }
            console.log('Secret is: ', process.env.JWT_SECRET);
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user.toJSON(),
                String(process.env.JWT_SECRET),
                { expiresIn: "1h" },
                );
            return res.json({success: true, user, token, expiresIn: 3600});
        })(req, res);
    };

    /**
     * Sign up tool
     * */
    publicModule.signup_post = (req: any, res: any, next: any) => {
        passport.authenticate('local-signup', (err: any, user: any, info: any) => {
            if (err) {
                return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting signup
            if (!user) {
                return res.send({success: false, message: 'signup failed'});
            }
            return res.send({success: true, message: 'signup succeeded'});
        })(req, res);
    };

    publicModule.logout_get = (req: any, res: any) => {
        req.logout();
        res.redirect('/home');
    };

    publicModule.isLoggedIn = (req: any, res: any, next: any) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    };

    publicModule.get_user = (req: any, res: any, next: any) => {
        userCtrl.get(req, res);
    };

    /**
     * If doing a JWT validation use the follwoing before the api call
     * */
    publicModule.isJWTValid = (req: any, res: any, next: any) => {
        passport.authenticate('jwt', {session: false})(req, res, next);
    };

    /**
     * Test examples for api callback functions
     * */
    publicModule.test_get = (req: any, res: any) => {
        testCtrl.getAll(req, res);
    };

    publicModule.test_post = (req: any, res: any) => {
        testCtrl.insert(req, res);
    };

    publicModule.test_delete = (req: any, res: any) => {
        testCtrl.delete(req, res);
    };
    /**
     * ============================================
     * */

    return publicModule;
};
