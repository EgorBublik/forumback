const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2");
let cors = require('cors');
require('dotenv').config();


const app = express();
app.use(bodyParser.json());

app.use(cors())

const connection = mysql.createConnection({
    host: process.env.DBHost,
    user: process.env.DBUser,
    database: process.env.DBName,
    password: process.env.DBPassword,
    port: process.env.DBPort
});

connection.connect(function (err) {
    if (err) {
        return console.error("Error: " + err.message);
    } else {
        console.log("Mysql succesfully connected");
    }
});

app.get("/questions", function(req, res){
    connection.query("SELECT * FROM questions", function(err, data) {
        if(err) return console.log(err);
        res.send({
            questions: data
        });
    });
});

app.listen(process.env.Port, () => console.log('port '+process.env.Port))
