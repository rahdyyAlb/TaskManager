const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const serveIcone = require('serve-favicon');
const app = express();
const dotenv = require('dotenv');
const taskAPIRoute = require('./rootes/taskAPIRoute');
const taskRoute = require('./rootes/taskRoute');


dotenv.config();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(serveIcone(__dirname + '/public/sticker-pirate-one-piece-logo.jpg.png'));
app.use('/api/task',taskAPIRoute);
app.use('/',taskRoute);


app.use(session({keys: process.env.SECRET_KEY}));
mongoose.connect(process.env.Mongo_Connection,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.listen(8090, () => {
    console.log('Serveur démarré sur le port 8090');
});