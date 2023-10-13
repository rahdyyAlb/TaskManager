const express = require('express');
const router = express.Router();
const Task = require('../model/task');
const bodyParser = require('body-parser');
const taskControlleur = require("../controllers/taskControleur");



// page d'acceuil
router.get("/", taskControlleur.getTasks);
// formulaire de création
router.get("/task/new", taskControlleur.createTaskGet);
router.post("/task/new", taskControlleur.createTaskPost);
// suppression
router.get("/task/delete/:id", taskControlleur.deleteTask);

// export des routes contenu dans le router
module.exports = router;