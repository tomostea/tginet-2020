const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const crypto = require('crypto')
const sqlite = require('sqlite3').verbose();
var fs = require('fs');
const port = 3000

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/static', express.static('public'))

// GET method route
app.get('/', function (req, res) {
  const db = new sqlite.Database('opinion.sqlite');
  function getNewOrders() {
    return new Promise((resolve, reject) => {
      let orders = [];
      db.all('SELECT * FROM opinion', function (err, rows) {
        resolve(rows);
      });
    })
  }
  getNewOrders().then(r => {
    console.log(r)
    res.json(r)
  })
})

// POST method route
app.post('/', function (req, res) {
  const List = { "status": "your message has been received" };
  console.log(`POST is sended`)
  console.log(req.body);

  // デコード
  var encodedData = req.body.image;
  const fileData = encodedData.replace(/^data:\w+\/\w+;base64,/, '')
  var decode = new Buffer.from(fileData, 'base64');

  // 拡張子
  const fileExtension = encodedData.toString().slice(encodedData.indexOf('/') + 1, encodedData.indexOf(';'))

  // デコードされたものをhash化
  var sha512 = crypto.createHash('sha512');
  sha512.update(decode)
  var hash = sha512.digest('hex')
  console.log(hash);

  // ハッシュ値.pngの形で保存
  fs.writeFile(`public/images/${hash}.${fileExtension}`, decode, function (err) {
    console.log(err);
  });

  // DBにいれるデータ
  const Type = req.body.type
  const Longitude = req.body.longitude
  const Latitude = req.body.latitude
  const Comment = req.body.comment
  const Imageid = hash

  const db = new sqlite.Database('opinion.sqlite');
  // SQL を同期的に実行する
  db.serialize(() => {
    // テーブルがなければ作成する
    db.run('CREATE TABLE IF NOT EXISTS opinion (type TEXT, longitude REAL, latitude REAL, comment TEXT, imageid TEXT)');

    // Prepared Statement でデータを挿入する
    const stmt = db.prepare('INSERT INTO opinion VALUES (?, ?, ?, ?, ?)');
    stmt.run([Type, Longitude, Latitude, Comment, Imageid]);

    // prepare() で取得した Prepared Statement オブジェクトをクローズする。これをコールしないとエラーになる
    stmt.finalize();
  });
  db.close();

  // POST accion
  res.json(List);
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
