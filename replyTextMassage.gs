const replyTextMessage = (reply_token, message) => {  //lineへテキストを送る処理
  const url = 'https://api.line.me/v2/bot/message/reply';
  const bearer = '自分のbearer';
  const apiKey = "Bearer " + bearer;
  const option = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': apiKey,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [{
        'type': 'text',
        'text': message,
      }],
    }),
  };
  UrlFetchApp.fetch(url, option);
}