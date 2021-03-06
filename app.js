const express = require("express");
const app = express();

app.set("views","./public/views");
app.set("view engine" , "ejs");
app.use(express.static(__dirname + '/public/static'));

app.use(express.json());

app.get("/", ( req, res ) => {
    res.render("index");
});

app.listen(3000, () => console.log("server is running on 3000 port"));