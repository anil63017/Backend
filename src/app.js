require('dotenv').config();
const process = require('process');
const express = require('express');
const cors = require('cors');
const employeeRouter = require('./routes/employeeRouter');
const mongoose = require('mongoose');
const app = express()
const { PORT, DB_HOST, DB_NAME } = process.env;
app.use(cors());
app.use(express.json());

const port = PORT || 3000

app.use(require('./routes'));

mongoose.connect(`${DB_HOST}${DB_NAME}`).then(() => {
    app.listen(port, () => {
        console.log(`Database synced, started listening in port ${port}`)
    })
})