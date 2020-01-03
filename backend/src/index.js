const fs = require('fs')
const express = require('express')
const app = express()
const port = 3000

const MongoClient = require('mongodb').MongoClient;
const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'charts-task';
let db

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

app.post('/api/upload', upload.array('uploads[]'), (req, res) => {
  let file = req.files[0]
  let name = file.originalname
  fs.readFile(file.path, 'utf-8', (err, data) => {
    if (err) throw err;
    let one = { name, data }

    let col = db.collection('uploads')

    col
      .updateOne({ name: one.name }, {$set: one}, {
          upsert: true
        }, function(err, r) {
          if (err) throw err;

          col.find({ name: one.name }).limit(1).toArray(function(err, docs) {
            if (err) throw err;
            if (docs.length == 1) {
              res.json({ entry: docs[0] })
            }
          });
        });
  });
})

MongoClient.connect(DB_URL, (err, client) => {
  if (err) return console.log(err)
  db = client.db(DB_NAME)
  app.listen(port, () => console.log(`The App listening on port ${port}!`))
})
