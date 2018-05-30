
module.exports = (app: any, passport: any) => {
    const apiController = require('../controllers/apiController')(passport);

    console.log('=============BBBOI-------');

    app.route('/api/test/').get(apiController.test_get);
    app.route('/api/test/').post(apiController.test_post);
    app.route('/api/test/:id').delete(apiController.test_delete);

    app.route('/').get(apiController.home_get);
    app.route('/home').get(apiController.home_get);
    app.route('/login').get(apiController.login_get);
    app.route('/login').post(apiController.login_post);

    app.route('/signup').get(apiController.signup_get);
    app.route('/signup').post(apiController.signup_post);

    app.route('/profile').get(apiController.profile_get);
    app.route('/logout').get(apiController.logout_get);
};
