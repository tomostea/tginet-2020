const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const crypto = require('crypto')
var fs = require('fs');
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

  // デコード
  var encodedData = req.body.image;
  const fileData = encodedData.replace(/^data:\w+\/\w+;base64,/, '')
  console.log(fileData);
  var decode = new Buffer.from(fileData, 'base64').toString('binary');

  // デコードされたものをhash化
  var sha512 = crypto.createHash('sha512');
  sha512.update(decode)
  var hash = sha512.digest('hex')
  console.log(hash);

  // ハッシュ値.pngの形で保存
  fs.writeFile(`public/images/${hash}.png`, decode, function (err) {
    console.log(err);
  });

  // POST accion
  /*  
  const data = {
    type: this.checked,
    btName: this.btName,
    comment: this.comment
  }
  */
  res.json(List);
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
