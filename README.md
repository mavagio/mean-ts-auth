The following README provides detailed steps on how to run the code locally as well as how to deploy the application to Heroku.
In the last section explanation on how to create new endpoints is provided.
## How to run locally

Prerequisites
---------------
Make sure to have the following installed on your machine:
- mongoDB (make sure to have mongod running locally when running the code on a local machine)
- Node > 8.9 (!important)

Run the code
---------------
- Install dependencies. From root directory run:
```
npm run install:dependencies
```
- Create .env file in server folder.
- Copy the following lines to .env file.
```
PORT=3000
DEV_DB='mongodb://localhost/boilerplateDb'
NODE_ENV='development'
JWT_SECRET='change_this_example_secret'
```
- (Optional) Add the following to .env file if you want to run MongoDB with cloud provider (e.g. Mlab):
```
PROD_DB={{the URI provided by mongoDB could providers, e.g. Mlab}}
```
- Run the application by starting the client and server separately:
```
cd server; npm start
```
```
cd client; npm start
```

This will create the database locally. By running the server with the command:
```
npm run start:cloud
```
The server will run in production environment. In addition the server will try to connect to mongoDB form cloud provider.
## Deploy to Heroku
- Demo: https://mean-ts-auth.herokuapp.com
- Create a Heroku account and create a new project.
- Select the Deployment method with GitHub.
- Find the repository and connect Heroku with the Github repository you would like to deploy.
- Set up the enviroment variable in settings section in Heroku, for that you will need these variables:
```bash
JWT_SECRET # the secret string for Json Web Token
PROD_DB # the remote mongo database (e.g. Mlab)
TZ # time zone, e.g. can be Netherlands/Amsterdam
```
- After running deploy Heroku will build the application and deploy.
- In addition you can select "Enable Auto Deploy" and select a branch from the repo, this will make sure that every time you commit to the branch Heroku will reinitiate deployment. 
## Technology stack
MEAN Stack with TypeScript
- MongoDB
- Angular 6+
- Express
- Node > 8.9
- TypeScript
- JavaScript

## Creating a new endpoint
- Define your endpoint route in `server/src/api/routes/apiRoutes.ts`, example:
```TypeScript
app.route('/api/test/').get(apiController.test_get);
```
- Add function to handle the endpoint in `server/src/api/controllers/apiController.ts`, example:
```TypeScript
exports.test_get = (req: any, res: any) => {
    testCtrl.getAll(req, res);
};
```

## Creating a new model
- Add the new model to `server/src/api/models`, example:
```TypeScript
import mongoose = require('mongoose');
import {Schema, Document} from 'mongoose';

export interface ITest {
    name: string;
    email: string;
    type: number;
}

const TestSchema: Schema = new Schema({
    name: String,
    email: String,
    type: Number,
});

export interface ITestModel extends ITest, Document {
}

const TestModel = mongoose.model<ITestModel>('Test', TestSchema);

export default TestModel;
```
- Add controller for your model to `server/src/api/controllers`,
 the controller has to inherit from `baseController`, example:
```TypeScript
import Base from './baseController';

export default class TestClass<T extends any> extends Base<T> {
    constructor(model: T) {
        super(model);
    }

    public insert = (req: any, res: any) => {
        const obj = new this.model(req.body);
        obj.save((err: any, item: any) => {
            if (err) {
                return console.error(err);
            }
            res.status(200).json(item);
        });
    }
}
```