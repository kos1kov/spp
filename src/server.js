const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const mainController = require("./MainController").MainController;

const logger = require('morgan');
const multer  = require("multer");
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname)));


const newsRouter = express.Router();
app.use(multer({storage:storageConfig}).any("photo"));
app.use(bodyParser.urlencoded({extended: true}));

app.use("/news", newsRouter);

newsRouter.post("/new",  (req, res) => mainController.create(req, res));
newsRouter.get("/:id", (req,res) => mainController.show(req,res));
newsRouter.get("/", (req, res) => mainController.index(req, res));
newsRouter.delete("/:id", (req, res) => mainController.delete(req, res));
newsRouter.patch("/:id", (req, res) => mainController.update(req, res));

app.listen(port, () => console.log(`Listening on port ${port}`));