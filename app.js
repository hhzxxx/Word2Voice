const express = require("express");
const yuyin = require("./yuyin");
const app = express();
const port = 3000;

//设置跨域访问
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == "options") res.sendStatus(200);
  //让options尝试请求快速结束
  else next();
});

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(
  express.json({
    limit: "102400kb",
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname+'/index.html')
});

app.get("/getYuyin", (req, res) => {

  if (req.body.text) {
    console.log(req.body.text)
    yuyin.getYuyin(req.body.text,req.body.voice?req.body.voice:"Aixia",req.body.volume?req.body.volume:50,req.body.speech_rate?req.body.speech_rate:0).then((url) => {
      res.send(url);
    });
  } else {
    res.send("no text");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
