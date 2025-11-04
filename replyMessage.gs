const replyMessage = (replyToken, messages) => {  //lineへの送信。flexなど用
  const url = "https://api.line.me/v2/bot/message/reply";
  const bearer = '自分のbearer';
  const token = "Bearer " + bearer;

  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    payload: JSON.stringify({
      replyToken: replyToken,
      messages: messages
    })
  };

  UrlFetchApp.fetch(url, options);
}