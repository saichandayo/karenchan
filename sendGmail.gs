const sendGmail = (message) => {
  let to = "(受取用のgmailアドレス)";
  let subject = 'お問い合わせ';
  let body = message;
  let options = {
    name: 'user',
  };
  GmailApp.sendEmail(to , subject, body, options);
}