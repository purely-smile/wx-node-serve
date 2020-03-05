const rp = require("request-promise");
const { appId, appsecret } = require("./config.json");
module.exports = {
  /** 
   * 获取access_token
{
  "access_token": "31_v_zQXgAyROIYGtWaCsUgznm4Rbgtsvm5JxpyZKF2jXHBicvXG2lMkw6U9Rm4Yb_ULJY5-8CMPt12Lvpw-OBGcg",
  "expires_in": 7200,
  "refresh_token": "31_q7NLskyUD0zbq6uXfFwvdTYFy9_K-jd4tGh8owltDYhz116RJWsQmee8FYKtWRsp0b-y_PWQS9sUPBx0SaNKfw",
  "openid": "od0O1wPUPwzMw_nX9Z813a7e6dVM",
  "scope": "snsapi_userinfo"
}
   */
  getAccessToken(code) {
    return rp.get(
      "https://api.weixin.qq.com/sns/oauth2/access_token?" +
        `appid=${appId}&secret=${appsecret}&code=${code}&grant_type=authorization_code`,
      { json: true }
    );
  },
  /** 
   * 获取用户信息
   {
  "openid": "od0O1wPUPwzMw_nX9Z813a7e6dVM",
  "nickname": "微笑",
  "sex": 1,
  "language": "zh_CN",
  "city": "",
  "province": "北京",
  "country": "中国",
  "headimgurl": "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqp98MAhy0sVHvYImpicuEy84GkPcqk6TdDFDiceKLIGo0mJKwn7D5fctGbLRSzNTUww5nYKl3dQ7Kg/132",
  "privilege": []
}
   */
  getUserInfo(accessToken, openId) {
    return rp.get(
      `https://api.weixin.qq.com/sns/userinfo` +
        `?access_token=${accessToken}&openid=${openId}&lang=zh_CN`,
      { json: true }
    );
  }
};
