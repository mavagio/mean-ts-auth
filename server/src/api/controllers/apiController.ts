import {Model} from 'mongoose';
import * as testModel from '../models/testModel';
import TestCtrl from './testController';

const testCtrl = new TestCtrl<Model<testModel.ITestModel>>(testModel.default);

exports.test_get = (req: any, res: any) => {
    testCtrl.getAll(req, res);
};

exports.test_post = (req: any, res: any) => {
    testCtrl.insert(req, res);
};

exports.test_delete = (req: any, res: any) => {
    testCtrl.delete(req, res);
};
