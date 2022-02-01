const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 9090;

const app = express();

const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'assets')));
app.use('/shader', express.static(path.join(__dirname, 'shader')));

app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

router.get('/', function(req, res) {
  res.send('hello world');
});

app.use(router);

app.listen(port, 'localhost', function() {
  console.log('server listen on ', port);
});