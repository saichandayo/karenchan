const replyQuickReply = (reply_token) =>{
  const bearer = '自分のbearer';
  const payload = {
    replyToken: reply_token,
    messages: [
      {
        type: "text",
        text: "リマインダーの設定を変更しますか？",
        quickReply: {
          items: [
            {
              type: "action",
              action: {
                type: "message",
                label: "ONにする",
                text: "リマインダーON"
              }
            },
            {
              type: "action",
              action: {
                type: "message",
                label: "OFFにする",
                text: "リマインダーOFF"
              }
            }
          ]
        }
      }
    ]
  };

  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + bearer;
    },
    payload: JSON.stringify(payload)
  });
}