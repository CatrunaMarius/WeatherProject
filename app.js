const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

const port = 5000;

app.use(bodyParser.urlencoded({extended: true}))





app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")

})

app.post("/", function(req, res){
    
    
    const query = req.body.cityName;
    const apiKey = "e631244554cc2914ee64e901e4ce88a4";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query +"&units="+ unit + "&appid="+apiKey
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData =JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/"+  icon +"@2x.png"

            //in fiecare app.get() poate exista doar un singur res.send()
            //pote exista foarte mult res.write()
            
            res.write("<p></p>Vremea curenta este " + weatherDescription +  "</p>")
            res.write( "<h1>Temperatura in "+ query +" este " +Math.round(temp) + " de grade</h1>")
            res.write("<img src=" + imageURL+">")
            res.send()
            
        })
    })
})
/*

*/






app.listen(port, function(){
    console.log("Servar is running on port "+port);
})
