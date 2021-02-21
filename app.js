//http://52.90.242.78:8080

var http = require('http');
var express = require('express');
const ip = require('ip');
const PublicIp = require('nodejs-publicip');
const bodyParser = require('body-parser');
const cors = require('cors');
var app = express();
app.use(express.static('public'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/getpublicipaddress', (req, res) => {
   new PublicIp()
   .queryPublicIPAddresses()
   .then((result) => {
       res.json(result.ipv4);
   })
   .catch((err) => {
       console.log(err);
   });
    
});

app.get('/getprivateipaddress', (req, res) => {
   res.json(ip.address()); 
});

 var server = app.listen(8080, function () {
    console.log(`Application listening locally at: ${ip.address()}:${server.address().port}`);
    new PublicIp()
    .queryPublicIPAddresses()
    .then((result) => {
        console.log("Application listening publicly at http://%s:%s", result.ipv4, server.address().port)
    })
    .catch((err) => {
        console.log(err);
    });
    
 });


