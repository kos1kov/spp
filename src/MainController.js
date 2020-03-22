class MainController{
    newController = require("./news_controller").news_controller;

    index(req, res){
        this.newController.findAll()
            .then(news => {
                res.json({
                    data: { news },
                });
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({ message: "400", err });
            });
    }
    show(req,res){
        this.newController.show(req.params.id)
            .then(news => {
                res.json({
                    data: { news },
                });
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({ message: "400", err });
            });
    }
    create(req, res){
        this.newController.create({
            name: req.body.event.name,
            description: req.body.event.description,
            photo: req.files
        })
            .then(news => {
                res.json({ data: { news } });
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({ message: "400", err });
            });
    }

    update(req, res){
        this.newController.update(
            {
                name: req.body.event.name,
                description: req.body.event.description,
                photo: req.files
            },
            req.params.id,
        )
            .then(news => {
                res.json({
                    data: { news },
                });
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }

    delete(req, res){
        this.newController.delete(req.params.id)
            .then(() => {
                res.json({ message: "News Deleted" });
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
}

let mainController = new MainController();
exports.MainController = mainController;