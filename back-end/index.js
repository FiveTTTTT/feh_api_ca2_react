const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
// const { FehHeroes } = require('./feh.js');


const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const fehSchema = new Schema({
    name: String,
    title: String,
    ultAtk: Number,
    stats: {
        hp: Number,
        atk: Number,
        spd: Number,
        def: Number,
        res: Number
    },
    isLegend: Boolean,
    isMythic: Boolean,
});

const FehHeroes = mongoose.model('FehHeroes', fehSchema);
// const feh = new FehHeroes({ name: "Lucina", title: "the swordy girl", ultAtk: 1 / 4, stats: { hp: 39, atk: 43, spd: 40, def: 52, res: 10 }, isLegend: false, isMythic: false });


const path = require('path');
const {
    stringify
} = require('querystring');
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', (req, res) => {
    res.send('Théodore CADET');
})

app.get('/show-heroes', (req, res) => {
    FehHeroes.find((err, result) => {
        // in case there is an error with our FehHeroes model, we we will send it to the user(postman)
        if (err) {
            res.send("Error occured no Hero found");
            return;
        }
        // if no error send the array conting heroes to the user/postman
        res.send(result);
        // log the result in the console as well
        console.log(result);
    })

})

// this query will will only return first element found
app.get('/show-heroes/:id', (req, res) => {
    const id = req.params.id;

    FehHeroes.findById(id, (err, hero) => {
        if (err) {
            res.send("Hero not found");
            return;
        }
        res.send(hero);
        console.log(hero);
    })
})

// will get all the heroes with the same name 
app.get('/show-heroes-named/:name', (req, res) => {
    const name = req.params.name;

    FehHeroes.find({
            name: name
        },
        function (err, hero) {
            if (err) {
                res.send("Hero not found");
                return;
            }
            if (hero.length == 0) {
                res.send("Hero not found");
                return;
            }

            res.send(hero);
            console.log(hero);
        }
    )
})


app.post('/post-heroes', (req, res) => {
    let name = req.body.name.toLowerCase();
    let title = req.body.title;
    let ultAtk = parseFloat(req.body.ultAtk);

    // On postman it should be written like this :
    // { "hp": 45,"atk": 51,"spd": 25,"def": 42,"res":  20 } 
    let stats = JSON.parse(req.body.stats);

    let isLegend = (req.body.isLegend === 'true');
    let isMythic = (req.body.isMythic === 'true');

    // We will take the information from postman to post the new hero
    let newHero = new FehHeroes({
        name: name,
        title: title,
        ultAtk: ultAtk,
        stats: stats,
        isLegend: isLegend,
        isMythic: isMythic
    });
    newHero.save(err => {
        if (err) {
            // if error send a message to let the user know
            res.send('Hero was not inserted into the database');
            return;
        }
        //send a message to the user with the result
        res.send("Hero was inserted into the database");
        console.log("Hero is in the database");
    })
})

app.delete('/delete-heroes/:id', (req, res) => {
    FehHeroes.findByIdAndDelete(req.params.id, err => {
        if (err) {
            res.send("Hero was not deleted");
            return;
        }
        res.send("Hero deleted");
        console.log(`Hero with id ${req.params.id} is now deleted`);
    })
})

app.put('/edit-heroes/:id', (req, res) => {
    // edit a specific hero from the database
    console.log("Trying to edit");

    FehHeroes.findByIdAndUpdate(req.params.id, {
        // keep the old value if there's nothing
        name: req.body.name == undefined ? req.params.name : req.body.name,
        title: req.body.title == undefined ? req.params.title : req.body.title,
        ultAtk: req.body.ultAtk == undefined ? req.params.ultAtk : req.body.ultAtk,
        stats: req.body.stats == undefined ? req.params.stats : JSON.parse(req.body.stats),
        isLegend: req.body.isLegend == undefined ? req.params.isLegend : (req.body.isLegend === 'true'),
        isMythic: req.body.isMythic == undefined ? req.params.isMythic : (req.body.isMythic === 'true')
    }, err => {
        if (err) {
            res.send("It didn't edit. The error is: " + err);
            return;
        }
        console.log("It has been edited");
        res.send("It's has been edited");
    })
})


app.listen(port, () => {
    mongoose.connect('mongodb+srv://admin:admin@fehapi.leurh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');


    console.log(`Example app listening at http://localhost:${port}`);
})