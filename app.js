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
      const temp = weatherData.data[0].weather.description;
      console.log(temp);
    });
  });
  res.send("server is up");
});
