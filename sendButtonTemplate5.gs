const sendButtonTemplate5 = (reply_token) => {
  const message = {
    messages: [
      {
      type: "text",
      text: "設定したい方をえらんでください"
      },
      {
        type: "template",
        altText: "設定したい方を選んでください",
        template: {
          type: "buttons",
          title: "リマインダーの設定",
          text: "どちらか選んでください",
          actions: [
            {
              type: "message",
              label: "当日のリマインダー",
              text: "当日のリマインダー"
            },
            {
              type: "message",
              label: "一週間のリマインダー",
              text: "一週間のリマインダー"
            },
            {
              type: "message",
              label: "リマインダーの設定状況",
              text: "リマインダーの設定状況"
            }
          ]
        }
      }
    ]
  };
  replyMessage(reply_token, message.messages);
}