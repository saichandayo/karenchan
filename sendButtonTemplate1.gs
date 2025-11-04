const sendButtonTemplate = (event) => {
  const replyToken = event.replyToken;
  const message = {
    messages: [
      {
        type: "template",
        altText: "自分の学年を選んでください",
        template: {
          type: "buttons",
          title: "ユーザ登録",
          text: "学年を選んでください",
          actions: [
            {
              type: "message",
              label: "１年生",
              text: "１年生"
            },
            {
              type: "message",
              label: "２年生",
              text: "２年生"
            },
            {
              type: "message",
              label: "３年生",
              text: "３年生"
            },
            {
              type: "message",
              label: "４年生",
              text: "４年生"
            }
          ]
        }
      }
    ]
  };
  replyMessage(replyToken, message.messages);
}