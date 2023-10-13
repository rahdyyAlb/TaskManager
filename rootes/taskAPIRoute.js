const express = require('express');
const router = express.Router();
const Task = require('../model/task');
const crypto = require ('crypto');

//route /api/user/all
router.route('/all')
    .get((req,res)=>{
        Task.find()
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(400).json(error))
    });

// route pour récupérer un user suivant sont id : localhost/api/user/id
router.route("/:id")
    .get((req, res) => {
        Task.findOne({ _id: req.params.id})
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(400).json(error))
    })
    .put((req, res) => {
// crypte le mdp avec createHmac qui est dans le module crypto
        req.body
// met à jour le user
        Task.updateOne({_id: req.params.id}, req.body)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(400).json(err));
    });


router.route("/")
    .post((req, res) => {

        req.body

        let user = new Task(req.body);
        user.save()
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(400).json(err));
    });



router.route("/delete/:id")
    .delete((req, res) => {
        Task.deleteOne({ _id: req.params.id})
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(400).json(error))
    });
// exporter le router
module.exports = router;



