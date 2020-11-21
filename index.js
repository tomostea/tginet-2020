const express = require('express')
const app = express()
const port = 3000

// GET method route
app.get('/', function (req, res) {
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

  // GET accion
  res.json(List);
})

// POST method route
app.post('/', function (req, res) {
  const List = { "status": "your message has been received" };
  console.log(`POST is sended`)
  console.log(req.data);

  // POST accion
  res.json(List);
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
