const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
   res.sendFile(__dirname + "/index.html");


});

app.post("/weather", function(req,res){
    const city = req.body.city; 
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=6a4227723f6e8913004ac97c3ab2e032";
    https.get(url, function(response){
        response.on("data",function(data){
        const weatherdata = JSON.parse(data);
        const temp= weatherdata.main.temp;
        res.write("The temp at "+ city +" is " + temp +" kelvin");
        res.send();       
      });
    });
});

app.listen(process.env.PORT || 3000);