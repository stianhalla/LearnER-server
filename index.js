/**
 * Startpunkt for server (første som kjører av kode)
 * */

// Gjør .env fil tilgjengelig
require('dotenv').config();

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router');


// App Setup
const app = express();
app.use(express.static('public')) // Gir alle tilgang til å se innhold av public mappe
app.use(morgan('combined')) // Logger feil til konsollet
app.use(cors()); // TODO: bare godkjenn fra klient server
app.use(bodyParser.json({ type: '*/*' })); // parser alle requests til json
router(app); // Kaller router med applikasjonen

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server lytter på port ', port);
