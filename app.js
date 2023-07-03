const express = require("express");
const app = express();

app.listen(3000, function () {
  console.log("server running port 3000");
});

// what happen when user go to root rouite (home)

app.get("/", function (req, res) {
  res.send("server is up");
});
