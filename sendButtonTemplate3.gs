const sendButtonTemplate3 = (reply_token) => {
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
          title: "お問い合わせ・使用方法",
          text: "どちらか選んでください",
          actions: [
            {
              type: "message",
              label: "お問い合わせ",
              text: "お問い合わせ"
            },
            {
              type: "message",
              label: "使用方法",
              text: "使用方法"
            }
          ]
        }
      }
    ]
  };
  replyMessage(reply_token, message.messages);
}