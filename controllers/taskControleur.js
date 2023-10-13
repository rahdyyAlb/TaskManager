const Task = require("../model/task");

module.exports.getTasks = (req, res) => {
    Task.find({}, '__id label description dateTask status')
        .then((tasks) => {
            res.render('home', { tasks });
        })
        .catch((error) => res.status(400).json(error));
};

module.exports.createTaskGet = (req, res) => {
    res.render('new-task-form');
};

module.exports.createTaskPost = (req, res) => {
    let label = req.body.label;
    let description = req.body.description;
    let dateTask = req.body.dateTask;
    let status = req.body.status ;
    let error = ""

    if( status == 'on'){
        status = true
    }
    else {
        status = false
    }
    // Vérification des champs requis
    if (label === "" || description === "" || dateTask === "") {
        let erreurs = "Le champs suivant sont requis :";
        if (label === "") {
            erreurs += "   label , ";
        }
        if (description === "") {
            erreurs += " description , ";
        }
        if (dateTask === "") {
            erreurs += " date. ";
        }
         res.render("new-task-form", {
            erreurs: erreurs
        });
    }

else {
        // Création de la tâche
        let newTask = new Task({label, description, dateTask, status});

        // Enregistrement de la tâche dans la base de données
        newTask.save()
            .then((data) => {
                res.redirect("/");
            })
            .catch((err) => {
                res.status(400).json(err); // Utilisez le code de statut 400 pour indiquer une mauvaise requête en cas d'erreur
            });
    }
};

module.exports.deleteTask = (req, res) => {

    Task.deleteOne({ _id:  req.params.id})
        .then(() => {
            res.redirect('/')

        })
        .catch((error) => {
            res.status(400).json(error);
        });
};

