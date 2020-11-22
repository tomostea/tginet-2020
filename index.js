const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/static', express.static('public'))

// GET method route
app.get('/', function (req, res) {
  const List = [
    {
      type: 'trouble',
      longitude: 34.1,
      latitude: 10.2,
      imageid: 'abcd',
      comment: '直して',
    },
    {
      type: 'request',
      longitude: 34.2,
      latitude: 10.3,
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
  console.log(req.body);

  // POST accion
  res.json(List);
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
