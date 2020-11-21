const express = require('express')
const app = express()
const port = 3000
console.log('Server is online.');

// GET method route
app.get('/', function (req, res) {
  console.log(`Get is sended`)
  res.send(' Hi ');
})

app.get('/test', function (req, res) {
  const List = [
    {
      situation: '崩壊',
      location: {
        longitude: 34.1,
        latitude: 10.2
      },
      imageid: 'abcd',
      comment: '直して',
    },
    {
      situation: '追加',
      location: {
        longitude: 34.2,
        latitude: 10.3
      },
      imageid: '1234',
      comment: '欲しい',
    },
  ];

  // JSONを送信する
  res.json(List);
})

// POST method route
app.post('/test', function (req, res) {
  console.log(`POST is sended`)
  console.log(req.body);
  console.log(req.body.name);
  res.send('POST is sended.');
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})