export default class Base<T extends any> {
    protected sortDir: number = 1;
    protected model: T;

    constructor(model: T) {
        this.model = model;
    }

    public getAll(req: any, res: any) {
        this.model.find({}, (err: any, docs: any) => {
            if (err) {
                return console.error(err);
            }
            res.json(docs);
        });
    }

    public insert(req: any, res: any) {
        const obj = new this.model(req.body);
        obj.save((err: any, item: any) => {
            if (err) {
                return console.error(err);
            }
            res.status(200).json(item);
        });
    }

    public delete(req: any, res: any) {
        this.model.findOneAndRemove({_id: req.params.id}, (err: any, obj: any) => {
            if (err) {
                return console.error(err);
            }
            res.sendStatus(200);
        });
    }

    public deleteAll(req: any, res: any) {
        this.model.remove({}, (err: any) => {
            if (err) {
                return console.error(err);
            }
            res.sendStatus(200);
        });
    }

    public update(req: any, res: any) {
        this.model.findOneAndUpdate({id: req.params.id}, req.body, (err: any) => {
            if (err) {
                return console.error(err);
            }
            res.sendStatus(200);
        });
    }

    public get(req: any, res: any) {
        this.model.findOne({entryId: req.params.entryId}, (err: any, obj: any) => {
            if (err) {
                return console.error(err);
            }
            res.json(obj);
        });
    }
}
