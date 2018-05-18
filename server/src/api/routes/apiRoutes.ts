const apiController = require('../controllers/apiController');

module.exports = (app: any) => {
    app.route('/api/test/').get(apiController.test_get);
    app.route('/api/test/').post(apiController.test_post);
    app.route('/api/test/:id').delete(apiController.test_delete);
};
