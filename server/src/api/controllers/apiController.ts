import {Model} from 'mongoose';
import * as testModel from '../models/testModel';
import TestCtrl from './testController';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';

module.exports = function (passport: any) {
    const testCtrl = new TestCtrl<Model<testModel.ITestModel>>(testModel.default);

    let publicModule: any = {};

    publicModule.home_get = (req: any, res: any, next: any) => {
        res.sendFile(path.resolve('public/index.html'));
    };

    /**
     * Session based login functionality
     * */
    publicModule.session_login_post = (req: any, res: any, next: any) => {
        passport.authenticate('local-login', {session: true}, function(err: any, user: any, info: any) {
            if (err) {
                return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting signup
            if (! user) {
                return res.send({ success : false, message : 'login failed' });
            }

            req.login(user, {session: true}, (err: any) => {
                if (err) {
                    res.send(err);
                }
                return res.json({success: true, user});
            });
        })(req, res);
    };

    /**
     * JWT token based login functionality
     * */
    publicModule.jwt_login_post =  (req: any, res: any, next: any) => {
        passport.authenticate('local-login', {session: false}, function(err: any, user: any, info: any) {
            if (err) {
                return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting signup
            if (! user) {
                return res.send({ success : false, message : 'login failed' });
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user.toJSON(), 'the_secret_seed_that_will_be_changed', {expiresIn: "1h"});
            return res.json({success: true, user, token});
        })(req, res);
    };

    /**
     * Sign up tool
     * */
    publicModule.signup_post = (req: any, res: any, next: any) => {
        passport.authenticate('local-signup', function(err: any, user: any, info: any) {
            if (err) {
                return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting signup
            if (! user) {
                return res.send({ success : false, message : 'signup failed' });
            }
            return res.send({ success : true, message : 'signup succeeded' });
        })(req, res);
    };

    publicModule.logout_get = (req: any, res: any) => {
        req.logout();
        res.redirect('/home');
    };

    publicModule.isLoggedIn = (req: any, res: any, next: any) => {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    };

    /**
     * If doing a JWT validation use the follwoing before the api call
     * */
    publicModule.isJWTValid =  (req: any, res: any, next: any) => {
        passport.authenticate('jwt', { session: false })(req, res, next);
    };

    /**
     * Test examples for api callback functions
     * */
    publicModule.test_get = (req: any, res: any) => {
        console.log('Got to the main request part:');
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