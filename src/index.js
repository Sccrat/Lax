const express = require("express");
const app = express();
const fetch = require('node-fetch');
var moment = require('moment');
const mailer = require('./templates/email');
const cors = require('cors');
app.use(cors());


//Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());



//routes

app.get('/coviddaily', async function (req, res) {

    const response = await fetch('https://api.covidtracking.com/v1/us/daily.json');
    const data = await response.json();
    var arr = [];
    var newObj = data.map(function(d) {
        let arre = d.date.toString().split('');
    return arr.push({Date:arre[0]+arre[1]+arre[2]+arre[3]+'-'+arre[4]+arre[5]+'-'+arre[6]+arre[7],Positivos:d.positive,Negativos:d.negative,Pendientes:d.pending,Muertes:d.death
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


app.listen(3001, () => {
 console.log("El servidor está inicializado en el puerto 3001");
});


