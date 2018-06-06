import Base from './baseController';

/**
 * User class
 * */

export default class UserClass<T extends any> extends Base<T> {
    constructor(model: T) {
        super(model);
    }

    get (req: any, res: any) {
        console.log('In the child to get him: ');
        this.model.findOne({_id: req.params.userId}, (err: any, obj: any) => {
            console.log('found the object: ', obj);
            if (err) {
                return console.error(err);
            }
            res.json(obj);
        });
    }
}
