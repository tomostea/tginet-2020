const express = require('express')
const app = express()
const port = 3000
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
console.log('Server is online.');

// GET method route
app.get('/', function (req, res) {
  console.log(`Get is sended`)
  res.send(' Hi ');
})

app.get('/test', function (req, res) {
  const List = [
    { title: '状況', done: true },
    { title: '場所', done: false },
    { title: '画像id', done: false },
    { title: 'コメント', done: false },
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