import {UserModule} from '../api/models/userModel';

const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = (passport: any) => {
    /**
     * PASSPORT SESSION SETUP
     * required for persistent login sessions
     * passport needs ability to serialize and unserialize users out of session
     **/
    passport.serializeUser((user: any, done: any) => {
        done(null, user.id);
    });

    passport.deserializeUser((id: any, done: any) => {
        UserModule.findById(id, (err: any, user: any) => {
            done(err, user);
        });
    });

    /**
     * LOCAL SIGNUP
     * we are using named strategies since we have one for login and one for signup
     * by default, if there was no name, it would just be called 'local'
     **/
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        (req: any, email: any, password: any, done: any) => {
            process.nextTick(() => {
                UserModule.findOne({'local.email': email}, (err: any, user: any) => {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        return done(null, false, null);
                    } else {
                        const newUser = new UserModule();
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.save((err2: any) => {
                            if (err2) {
                                throw err2;
                            }
                            return done(null, newUser);
                        });
                    }

                });

            });

        }));

    /**
     * LOCAL LOGIN
     * we are using named strategies since we have one for login and one for signup
     * by default, if there was no name, it would just be called 'local'
     * */
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        (req: any, email: any, password: any, done: any) => { // callback with email and password from our form
            UserModule.findOne({'local.email': email}, (err: any, user: any) => {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, console.log('no user found'));
                }

                if (!user.validPassword(password)) {
                    return done(null, false, console.log('wrong password'));
                }

                return done(null, user);
            });

        }));

    /**
     * JWT STRATEGY
     * to verify the validity of json web token
     * */
    passport.use('jwt', new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: String(process.env.JWT_SECRET),
        },
        (jwtPayload: any, done: any, req: any) => {
            UserModule.findOne({id: jwtPayload.sub}, (err: any, user: any) => {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        },
    ));
};
