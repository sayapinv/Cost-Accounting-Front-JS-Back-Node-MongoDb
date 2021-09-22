const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongose = require('mongoose');
const app = express();

const apiRoutes = require("./src/modules/routes/routes")

app.use(cors());

const uri = "mongodb+srv://admin:7NCzpik0GbqWinpL@cluster0.kwcb8.mongodb.net/todo?retryWrites=true&w=majority";
mongose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

app.use(bodyParser.json());
app.use("/",apiRoutes);

app.listen(8000, () => {
  console.log('Connect');
});
