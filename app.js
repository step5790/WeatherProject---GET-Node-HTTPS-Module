const express = require("express");
const app = express();
const https = require("https");

app.listen(3000, function () {
  console.log("server running port 3000");
});

// what happen when user go to root rouite (home)

app.get("/", function (req, res) {
  // using https module to get url

  const url =
    "https://api.weatherbit.io/v2.0/current?city=copenhagen&key=3465bd2a83d24c468bbd2cfa676763f6";

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
      res.write(`<p>The weather is currently: ${descr}</p>`);
      res.write(`<h1>The temperature is: ${temp} degress Celcius</h1>`);
      res.write(`<img src="${imgURL}/${icon}.png">`);

      // send data using res from  app.get **can only have one response/res in one app.get (method)
      res.send();
    });
  });
});
