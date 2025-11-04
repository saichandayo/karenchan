const dayReminder = () =>{
  today = Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy/MM/dd");
  const today_detail = new Date();
  const parts = today.split("/");
  const today_month = parseInt(parts[1], 10) - 1;
  const today_day = parseInt(parts[2], 10);
  const dayIndex = today_detail.getDay(); //曜日の取得
  const days_all = ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'];
  const daymark_all = ['🟠','🟣','🔴','🔵','🟢','🟡','🟤']; //日付の色
  const bearer = '自分のbearer';

  let sheet = [];
  for(let m=1;m<=4;m++){
    sheet.push(getCalendarLog(m));
  }
  
  let sheet2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ユーザ管理');
  const data_user = sheet2.getDataRange().getValues();

  let count_r = 0;
  let num = 0;
  for(let i=0;i<data_user.length;i++){
    num = data_user[i][2];
    let message = `${daymark_all[dayIndex]}【${today_month+1}/${today_day}-${days_all[dayIndex]}】 (${num}年)\n\n`;;//messageの定義
    message += message_get(sheet[num-1],today);//messageにtodayの日付の予定を追加
    if(data_user[i][3] === 1){
      sendToLINE(message, count_r);
    }
    count_r++;
  }
}

const sendToLINE = (text, count_r) => {
  const token = 'Bearer '+bearer;
  const url = 'https://api.line.me/v2/bot/message/push';

  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ユーザ管理');
  const data = sheet.getDataRange().getValues();
    const userId = data[count_r][0];
    const payload = {
    to: userId,
    messages: [{
      type: 'text',
      text: text
    }]
    };

    const options = {
      method: 'post',
      contentType: 'application/json',
      headers: {
        Authorization: token
      },
      payload: JSON.stringify(payload)
    };

    UrlFetchApp.fetch(url, options);
}