const express = require("express");
const request = require("request");
const yuyin = require("./yuyin");
const app = express();
const port = 9080;

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

app.get("/yuyin/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let lock = false;

app.get("/yuyin/get", (req, res) => {
  if (!lock) {
    lock = true;
    if (req.body.text || req.query.text) {
      let data = req.body.text ? req.body : req.query;
      if (data.text.length > 200) {
        res.send("text limit");
      }
      {
        yuyin
          .getYuyin(
            data.text,
            data.voice ? data.voice : "Aixia",
            data.volume ? data.volume : 50,
            data.speech_rate ? data.speech_rate : 0
          )
          .then(
            (url) => {
              request
                .get({
                  url: `https://www.zaixianai.cn${url}`,
                  gzip: true,
                  headers: {
                    usertoken: "lolixxx",
                    referer: "https://www.zaixianai.cn/voiceCompose",
                  },
                })
                .on("response", function (response) {
                  lock = false;
                  response.pipe(res);
                });
            },
            (rej) => {
              lock = false;
              res.send(rej);
            }
          );
      }
    } else {
      lock = false;
      res.send("no text");
    }
  } else {
    res.send("wait");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
