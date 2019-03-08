const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://admin:admin@cluster0-pmvpc.gcp.mongodb.net/test?retryWrites=true"
const PORT = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const client = new MongoClient(uri, {
    useNewUrlParser: true
});

client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});


//Routes
require('./routes')(app)

//Escutando porta
app.listen(PORT);
console.log("Magic happens on port " + PORT);
exports = module.exports = app;