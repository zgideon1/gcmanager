const express = require("express");
const bcrypt = require("bcrypt");
const {sequelize} = require("./models");
const config = require("../src/config/config.js");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

require('./routes')(app);

sequelize.sync()
    .then(() => {
        app.listen(config.port)
        console.log(`Server started on port ${config.port}`)
    });

module.exports = app;