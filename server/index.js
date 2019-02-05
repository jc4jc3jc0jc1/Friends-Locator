var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mysql');

var app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../react-client/dist'));

// READ API
app.get('/contacts', (req, res) => {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

// CREATE API
app.post('/contacts', (req, res) => {
  items.createOne(req.body, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(201).send('Created new contact');
    }
  });
});

// UPDATE API
app.put('/contacts', (req, res) => {
  items.updateOne(req.body, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send('Updated contact information');
    }
  })
});

// DELETE API
app.delete('/contacts', (req, res) => {
  items.deleteOne(req.body, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200).send('Deleted contact information')
    }
  })
});

app.listen(process.env.PORT || 3000, function() {
  console.log('listening on port 3000!');
});









