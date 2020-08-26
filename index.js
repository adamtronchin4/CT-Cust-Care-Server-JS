const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const Note = require('./models/note')
const User = require('./models/user')
const MyNotesID = require('./models/myNotesID')
const Auth = require('./services/authService.js')
mongoose.connect('mongodb://admin:PASSpass9@24.57.226.129:27117/cust-care-db?authSource=admin',{ useNewUrlParser: true, useUnifiedTopology: true })

const port = 8000
const app = express()

app.use(bodyParser.json())

const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("DB Connected")
        app.listen(port, ()=>{
    
            console.log(`Server is listening on port: ${port}`)
        })
});

function sendResponse(res, err, data){
    if(err){
        res.json({
            success: false,
            message: err
        })
    } else if (!data){
        res.json({
            success: false, 
            message: "Not Found"
        })
    } else {
        res.json({
            success: true,
            data: data
        })
    }
}

function authenticate(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null){
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err){ 
            console.log(err)
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

function getUserMyNotes(req, res, err, data){
    Note.find(
        (err, data)=>{sendResponse(res, err, data)}
    )
}

app.all('/', function (req, res, next) {
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
})

app.route('/myNotes')
.get((req, res)=>{
    getUserMyNotes(req, res)
})

app.route('/users')
.get((req, res)=>{
    User.find(
        (err, data)=>{sendResponse(res, err, data)}
    )
})