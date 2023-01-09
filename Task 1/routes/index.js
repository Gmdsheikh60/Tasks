var express = require("express");

var clientController = require("../controllers/tasks.js");

var app = express();

app.get("/I/want/title/", clientController.getTitles);

app.get("*", function (request, response) {
  response.status(404).send("Not found");
});

app.listen(3000);
