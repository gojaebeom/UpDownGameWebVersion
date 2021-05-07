const express = require("express");
const app = express();

app.use(express.json());
app.set("views","./public/views");
app.set("view engine" , "ejs");
app.use(express.static(__dirname + '/public/static'));

app.get("/", ( req, res ) => {
    console.log("map index");
    res.render("index");
});

app.listen(3000, () => console.log("server is running on 3000 port "));