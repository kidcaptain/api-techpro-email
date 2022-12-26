const express = require('express');

const app = express();
const port = 3000;

// Dans le fichier package.json ajouter '"start": "nodemon index.js"' dans la partie script pour créer la commande 'npm run start'

// nodemon permet de rafraichir le code sans tout fois relancer la commande npm run start 


// Point de terminaisons = app.METHODE(CHEMIN, GESTIONNAIRE(req,res)) ou route

// Req permet de recuperer un objet request correspondant a un la recus en entrée 

// Res c'est la reponse 

app.get('/', (req,res) => res.send(`App start to port 2 ${port}`));

app.get('/pat/:id/:text', (req,res) => {
    const id = req.params.id;
    const text = req.params.text;
    res.send(`Je me sens pas bien mais j'ai mon id: ${text.trim()}`);
});

app.listen(port, () => console.log(`L'application a démarré correctement sur : http://localhost:${port}`));