const weekReminder = () =>{
  today = Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy/MM/dd");
  const today_detail = new Date();
  const parts = today.split("/");
  const today_year = parseInt(parts[0], 10);
  const today_month = parseInt(parts[1], 10) - 1;
  const today_day = parseInt(parts[2], 10);
  const dayIndex = today_detail.getDay(); //曜日の取得
  const days = ['月曜日','火曜日','水曜日','木曜日','金曜日'];
  const daymark = ['🟣','🔴','🔵','🟢','🟡']; //日付の色
  let monday = '';
  let message = '';

  let sheet = [];
  for(let m=1;m<=4;m++){
    sheet.push(getCalendarLog(m));
  }
  
  let sheet2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ユーザ管理テスト用');
  const data_user = sheet2.getDataRange().getValues();

    switch(dayIndex){
      case 0:
        monday += Utilities.formatDate(new Date(today_year, today_month, today_day + 1), "Asia/Tokyo", "yyyy/MM/dd");
        break;
      case 1:
        monday += Utilities.formatDate(new Date(today_year, today_month, today_day), "Asia/Tokyo", "yyyy/MM/dd");
        break;
      case 2:
        monday += Utilities.formatDate(new Date(today_year, today_month, today_day - 1), "Asia/Tokyo", "yyyy/MM/dd");
        break;
      case 3:
        monday += Utilities.formatDate(new Date(today_year, today_month, today_day - 2), "Asia/Tokyo", "yyyy/MM/dd");
        break;
      case 4:
        monday += Utilities.formatDate(new Date(today_year, today_month, today_day - 3), "Asia/Tokyo", "yyyy/MM/dd");
        break;
      case 5:
        monday += Utilities.formatDate(new Date(today_year, today_month, today_day - 4), "Asia/Tokyo", "yyyy/MM/dd");
        break;
      case 6:
        monday += Utilities.formatDate(new Date(today_year, today_month, today_day - 5), "Asia/Tokyo", "yyyy/MM/dd");
        break;
    }

  let count_r = 0;
  let num = 0;
  for(let i=0;i<data_user.length;i++){
    for (let j = 0; j < 5; j++) { //月〜金（5日分）
    num = data_user[i][2];
      const target = new Date(monday); //毎回 monday を複製
      target.setDate(target.getDate() + j); //i日後にする
      const formatted = Utilities.formatDate(target, "Asia/Tokyo", "yyyy/MM/dd");

      const parts1 = formatted.split("/");
      const formatted_month = parseInt(parts1[1], 10) - 1;
      const formatted_day = parseInt(parts1[2], 10);

      message += daymark[j] + "【" +(formatted_month+1) + "/" + formatted_day + "-" + days[j] + '】\n';
      message += message_get(sheet[num-1], formatted);//曜日ごとの予定をmessageに追加
      message += '\n\n\n';//改行で調整
    }
    message = message.replace(/\n\n\n$/, '');//最後の改行を排除
    if(data_user[i][4] === 1){
      sendToLINE(message, count_r);
    }
    count_r++;
  }
}