const sendButtonTemplate2 = (reply_token) => {
  const message = {
    messages: [
      {
      type: "text",
      text: "どの先生の居場所が知りたいですか？"
      },
      {
        type: "template",
        altText: "先生の居場所を選んでください",
        template: {
          type: "buttons",
          title: "先生の居場所",
          text: "4人の中から選んでください。",
          actions: [
            {
              type: "message",
              label: "○○先生",
              text: "○○先生"
            },
            {
              type: "message",
              label: "○○先生",
              text: "○○先生"
            },
            {
              type: "message",
              label: "○○先生",
              text: "○○先生"
            },
            {
              type: "message",
              label: "○○先生",
              text: "○○先生"
            }
          ]
        }
      }
    ]
  };
  replyMessage(reply_token, message.messages);
}