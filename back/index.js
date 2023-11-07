const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScheme = new Schema({
    name: String,
    text: String,
    time: String
});


const accountScheme = new Schema({
    name: String
});

const Account = mongoose.model("Account", accountScheme)

const User = mongoose.model("User", userScheme);
//let arrayDb;

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

main().catch();



const cors = require('cors');
const express = require('express')
const app = express()
const port = 5000


app.use(cors());
app.get('/', async (req, res) => {
  res.send(await User.find().exec())
  res.end();
})

app.get('/ac', async (req, res) => {
  res.send(await Account.find().exec())
  res.end();
})

const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: false }));

app.post("/",bodyParser.json(),  async function (req, res , next) {
    let file = new User(req.body);
    await file.save();
    res.send(await User.find().exec() )
    res.end();
});

app.post("/ac",bodyParser.json(),  async function (req, res , next) {
    let file = new Account(req.body);
    await file.save();
    res.send(await Account.find().exec() )
    res.end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
