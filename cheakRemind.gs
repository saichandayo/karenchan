const checkRemind = (userId, reply_token) => {
  const sheetName = "ユーザ管理";
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let userSheet = spreadsheet.getSheetByName(sheetName);
  const lastRow = userSheet.getLastRow(); //データのある最終行を取得
  const values = userSheet.getRange(1, 1, lastRow, 5).getValues(); //(開始行, 開始列, 行数, 列数)
  let today_count = '';
  let week_count = '';
  const bearer = '自分のbearer';

  for(let i=0;i < values.length;i++){
    if(userId === values[i][0]){
      if(values[i][3] === 1){
        today_count = 'ON';
      }else{
        today_count = 'OFF';
      }
      if(values[i][4] === 1){
        week_count = 'ON';
      }else{
        week_count = 'OFF';
      }
      break;
    }
  }

  const payload = {
    replyToken: reply_token,
    messages: [
      {
        type: "text",
        altText: "リマインダーの状況",
        text: `当日: ${today_count} / 一週間: ${week_count}`
      }
    ]
  };

  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+bearer;
    },
    payload: JSON.stringify(payload)
  });
}