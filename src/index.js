const express = require("express");
const app = express();
const fetch = require('node-fetch');
var moment = require('moment');
const mailer = require('./templates/email');


//Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//routes

app.get('/coviddaily', async function (req, res) {

    const response = await fetch('https://api.covidtracking.com/v1/us/daily.json');
    const data = await response.json();
    var arr = [];
    var newObj = data.map(function(d) {
    return arr.push({Date:d.date,Positivos:d.positive,Negativos:d.negative,Pendientes:d.pending,Muertes:d.death
        });
    });
    res.send(arr);
});

app.post('/sendNotification', function (req, res)  {

var obj = {
    destinatarios:[req.body.destinatarios],
    mensaje:req.body.mensaje
};
    mailer.enviar_mail(req.body.destinatarios,req.body.mensaje);
    res.send(obj)
});


app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});


