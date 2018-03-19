const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://rizel:bobb@ds131687.mlab.com:31687/attendance', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 7000, () => {
    console.log('listening on 7000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
//this is loading our landing page
app.get('/', (req, res) => {
  db.collection('ontime').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})
//handles when someone posts a message
app.post('/attendance', (req, res) => {
  db.collection('ontime').save({firstName: req.body.firstName, lastName: req.body.lastName}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})
let date = new Date();


//handles when someone updates a message
app.put('/attendance', (req, res) => {
  db.collection('ontime')
  .findOneAndUpdate({firstName: req.body.firstName, lastName: req.body.lastName}, {
    $set: {
      thumbUp: "present "+ date,

    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
app.put('/attendanceTo', (req, res) => {
  db.collection('ontime')
  .findOneAndUpdate({firstName: req.body.firstName, lastName: req.body.lastName}, {
    $set: {
      thumbUp:"absent"
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
//handles when some deletes a message
app.delete('/attendance', (req, res) => {
  db.collection('ontime').findOneAndDelete({firstName: req.body.firstName, lastName: req.body.lastName}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
