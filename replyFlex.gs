const replyFlex = (reply_token, flex) => {
  const bearer = '自分のbearer';
  const payload = {
    replyToken: reply_token,
    messages: [
      {
        type: "flex",
        altText: "月次カレンダー",
        contents: flex
      }
    ]
  };

  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + bearer;
    },
    payload: JSON.stringify(payload)
  });
}