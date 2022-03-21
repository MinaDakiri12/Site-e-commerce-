require('dotenv').config();
const express = require('express');
const app = express();
const port = 3018;
const mongoose = require('mongoose');
const cors = require('cors');
const cookie = require('cookie-parser')
const path = require('path');

//require component

const Router = require('./routes/allRoutes')

app.use('/uploads', express.static(path.join(__dirname, './uploads')));

//set up server
app.use(express.json()); // for data json
app.use(express.urlencoded({ extended: false })); // for data http
app.use(cookie());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//connect to mongodb
mongoose.connect(process.env.DATABAS, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('server connect'))
    .catch(() => console.log('err server'))

//Router
app.use('/api', Router);

app.listen(port, () => console.log('http://localhost:' + port));

