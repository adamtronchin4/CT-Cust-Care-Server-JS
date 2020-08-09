const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Note = require('./models/note')
const User = require('./models/user')
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

app.route('/myNotes')
.get((req, res)=>{
    Note.find(
        (err, data)=>{sendResponse(res, err, data)}
    )
})

app.route('/users')
.get((req, res)=>{
    User.find(
        (err, data)=>{sendResponse(res, err, data)}
    )
})