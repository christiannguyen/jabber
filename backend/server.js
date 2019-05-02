const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./controller');
require('es6-promise').polyfill();
require('isomorphic-fetch');
require('dotenv').config();

const API_PORT = 3001;
const app = express();

const corsOptions = { credentials: true };

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
