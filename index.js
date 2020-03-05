const express = require("express");
const session = require("express-session");
const { getAccessToken, getUserInfo } = require("./api");
const app = express();
const port = 3000;

app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);

app.use(express.static("public"));

app.get("/cb", async (req, res) => {
  const { code } = req.query;
  console.log('code',code)
  if (req.session.openid) {
    console.log("用户id已存在，直接重定向");
    res.redirect("/");
    return;
  }
  if (!code) {
    return res.send("为获取到code");
  }
  const { access_token, openid } = await getAccessToken(code);
  const { nickname, headimgurl } = await getUserInfo(access_token, openid);
  req.session.openid = openid;
  res.redirect("/");
});

app.get("/base-url", (req, res) => {
  if (isWx && req.session.openid){
    res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfb8ef8e967d1696f&redirect_uri=http%3A%2F%2Fkm29ui.natappfree.cc%2Fcb&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect')
  } else {
    res.redirect(url)
  }
});

app.listen(port, () => {
  console.log(`run at ${port}`);
});
