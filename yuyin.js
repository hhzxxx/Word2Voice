let Nightmare = require("nightmare");

function getYuyin(text, voice = "Aixia", volume = 50, speech_rate = 0) {
  const promise = new Promise(function (resolve, reject) {
    try {
      console.log("getYuyin", text);
      let nightmare = new Nightmare({
        show: false,
        openDevTools: {
          show: false,
          mode: "undocked", // 开发者工具位置：right, bottom, undocked, detach
        },
        waitTimeout: 10000,
        executionTimeout: 10000,
      });
      nightmare
        .goto("https://www.zaixianai.cn/voiceCompose")
        .wait(".bofan")
        .evaluate((voice) => {
          $(".slide_gem .slide_top .fadines ul .on").data("value", voice);
        }, voice)
        .evaluate(
          (text, volume, speech_rate) => {
            $(".gem").val(text);
            $("#span").text(volume); //音量
            $("#spans").text(speech_rate); //速度

            tncode._send_result_success("ok", 1);
          },
          text,
          volume,
          speech_rate
        )
        .wait("#myMusic[src]")
        .evaluate(() => {
          console.log($("#myMusic").attr("src"));
          return $("#myMusic").attr("src");
        })
        .end()
        .then((url) => {
          if (url) {
            resolve(url);
            console.log("close nightmare", url);
          } else {
            console.log("error");
            reject("error");
          }
        });
    } catch (e) {
      reject(e);
    }
  });
  return promise;
}

module.exports = {
  getYuyin,
};
