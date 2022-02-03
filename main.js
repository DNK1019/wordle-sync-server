var express = require("express");
var cors = require("cors");
var fs = require('fs');
var app = express();

app.use(cors());
app.use(express.json());
app.post("/upsync", function(req, res){
    fs.writeFile("users/" + req.body.user + ".json", JSON.stringify(req.body.data), function (err) {
        if (err) return console.log(err);
        console.log(req.body);
        res.status(200).send("Successfully saved data");
      });
});
app.post("/downsync", function(req, res){
    console.log(req.body);
    fs.readFile("users/" + req.body.user + ".json", function (err, data) {
        if (err) {
            res.status(404).send({
                "stats": null,
                "game": null
            });
            return console.log(err);
        }
        console.log(req.body);
        res.send(data)
      });
});

app.listen(3078)