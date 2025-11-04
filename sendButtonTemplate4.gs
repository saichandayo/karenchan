const sendButtonTemplate4 = (reply_token) => {
  const message = {
    messages: [
      {
      type: "text",
      text: "使用したい方を選んでください"
      },
      {
        type: "template",
        altText: "使用したい方を選んでください",
        template: {
          type: "buttons",
          title: "来週の予定・月の予定",
          text: "どちらか選んでください",
          actions: [
            {
              type: "message",
              label: "来週の予定",
              text: "来週の予定"
            },
            {
              type: "message",
              label: "月の予定",
              text: "月の予定"
            }
          ]
        }
      }
    ]
  };
  replyMessage(reply_token, message.messages);
}