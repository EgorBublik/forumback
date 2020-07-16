const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2");
let cors = require('cors')


const app = express();
app.use(bodyParser.json());

app.use(cors())

const connection = mysql.createConnection({
    host: "localhost",
    user: "ebublik",
    database: "ebublik",
    password: "si6phaexee4ahSha",
    port: "3306"
});

connection.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    } else {
        console.log("Подключение к серверу MySQL успешно установлено");
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

app.listen(3005, () => console.log('port 3005'))