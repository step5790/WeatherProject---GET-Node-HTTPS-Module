const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

// used body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// listen to server
app.listen(3000, function () {
  console.log("server running port 3000");
});

// send user input to body-parser
app.post("/", function (req, res) {
  // using https module to get url
  const query = req.body.cityName;
  const apiKey = "3465bd2a83d24c468bbd2cfa676763f6";
  const url = `https://api.weatherbit.io/v2.0/current?city=${query}&key=${apiKey}`;
  console.log(url);

  // get https data
  https.get(url, function (response) {
    // call method to get data from the url
    response.on("data", function (data) {
      // parse the date into JSON format
      const weatherData = JSON.parse(data);

      // specific parameter to return specific data from JSON
      const temp = weatherData.data[0].app_temp;
      const descr = weatherData.data[0].weather.description;
      const icon = weatherData.data[0].weather.icon;
      const imgURL = "https://cdn.weatherbit.io/static/img/icons";

      // send data using res.write **can have multiple write
      res.write(`<h1>The weather in ${query} is currently: ${descr}</h1>`);
      res.write(`<h3>The temperature is: ${temp} degress Celcius</h3>`);
      res.write(`<img src="${imgURL}/${icon}.png">`);

      // send data using res from  app.get **can only have one response/res in one app.get (method)
      res.send();
    });
  });
});

// get data and send to index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
