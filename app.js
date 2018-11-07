const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const pgp = require('pg-promise')();

const app = express();

app.use(express.static('css'));
app.use(bodyParser.urlencoded({extended: false}));

app.engine('mustache', mustacheExpress());
app.set('views','./views');
app.set('view engine', 'mustache');

const connectionString = "postgres://localhost:5432/dcdatabase"
const db = pgp(connectionString)

const models = require('./models')


// Get shoppinglist page
app.get('/shoppinglist', (req,res) => {

    models.shoppinglist.findAll()
        .then((shoppingList) => {
            res.render('shoppinglist', {shoppingList: shoppingList});
        })
        .catch((err)=> {
            console.log(err);
        })
});


// Get shoppinglist add page
app.get('/shoppinglist/add', (req,res) => {
    res.render('shoppinglist-add')
});


// Saves new shoppinglist to db using sequelize
app.post('/shoppinglist/add', (req,res) => {
    let name = req.body.name;
    let street = req.body.street;
    let city = req.body.city;
    let state = req.body.state;

    let shoppingList = models.shoppinglist.build({
        name: name,
        street: street,
        city: city,
        state: state
    });

    shoppingList.save()
        .then(function(newList) {
            console.log(newList);
            res.redirect('/shoppinglist')
        })
        .catch((err) => {
            console.log('Add error', err);
        })
});


// Get shoppinglist confirm remove page
app.get('/shoppinglist/remove/:id', (req,res) => {
    let id = req.params.id;

    models.shoppinglist.findAll({
        where: {
            id: id
        }
    })
    .then((shoppingList) => {
        res.render('shoppinglist-remove', {shoppingList: shoppingList});
    })
    .catch((err)=> {
        console.log(err);
    })  
});


// Delete shoppinglist once confirmed
app.post('/shoppinglist/remove/:id', (req,res) => {
    let id = req.params.id;

    return models.shoppinglist.destroy({
        where: {
            id: id
        }
    })
    .then(()=>{
        res.redirect('/shoppinglist');
    })
    .catch((err) => {
        confirm.log('Error removing item', err);
    })
})


app.listen(3000, ()=> {
    console.log('Server started');
});
