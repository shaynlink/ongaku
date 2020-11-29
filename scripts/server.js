'use strict';

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const http = require('http');
const app = express();

app.use(cors());

app.use(express.static('./docs'));

app.get('/', (req, res) => {
  const file = fs.readFileSync('./docs/index.html', {encoding: 'utf-8'})
      .replace(/css\//g, '/css/')
      .replace(/js\//g, '/js/')
      .replace(/\/\//g, 'https://');

  res.send(file);
});

http.createServer(app)
    .listen(process.env.PORT || 9000, '0.0.0.0')
    .on('listening', () => console.log(`Server listening at http://localhost:${process.env.PORT || 9000}/`));
