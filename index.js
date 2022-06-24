const express = require('express');
const app = express();
const path = require('path');

const https = require('https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use("/public", express.static(path.resolve(__dirname, 'public')));

app.get("/", function(req,res){
   res.sendFile(__dirname + "/index.html");
});
app.get("/search.html", function(req,res){
  res.sendFile(__dirname + "/search.html");
});
app.post("/weather", function(requ,resp){
    const city = requ.body.city; 
    console.log(city);
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=6a4227723f6e8913004ac97c3ab2e032";
    https.get(url, function(response){
        response.on("data",function(data){
        const weatherdata = JSON.parse(data);
        const temp= weatherdata.main.temp;
        resp.write("The temp at "+ city +" is " + temp +" kelvin");
        resp.send();       
      })
    })
})

app.listen(process.env.PORT || 3000);