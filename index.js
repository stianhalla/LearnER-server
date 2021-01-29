/**
 * Startpunkt for server (første som kjører av kode)
 * */
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const cors = require('cors');

// App Setup
const app = express();
app.use(morgan('combined')) // Logger feil til konsollet
app.use(cors()); // TODO: bare godkjenn fra klient server
app.use(bodyParser.json({ type: '*/*' })); // parser alle requests til json
router(app); // Kaller router med applikasjonen

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server lytter på port ', port);