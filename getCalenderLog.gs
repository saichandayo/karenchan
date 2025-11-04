function getCalendarLog(num){
  let data = [];
  let baseData = [];
  let classData = [];
  let lastRow = '';
  //ログシートの取得
  let url = '予定表があるスプレッドシートのURL';
  let sheet = SpreadsheetApp.openByUrl(url);
  sheet = sheet.getSheetByName("公開用カレンダー");
  switch (num){
    case 1:
      lastRow = sheet.getLastRow();
      baseData = sheet.getRange(4, 1, lastRow, 3).getValues(); //年・日・曜日
      classData = sheet.getRange(4, 4, lastRow, 4).getValues(); //授業内容
      for (let i = 0; i < baseData.length; i++) {
        data.push(baseData[i].concat(classData[i])); //行ごとに結合
      }
      break;
    case 2:
      lastRow = sheet.getLastRow();
      baseData = sheet.getRange(4, 1, lastRow, 3).getValues(); //年・日・曜日
      classData = sheet.getRange(4, 9, lastRow, 4).getValues(); //授業内容
      for (let i = 0; i < baseData.length; i++) {
        data.push(baseData[i].concat(classData[i])); //行ごとに結合
      }
      break;
    case 3:
      lastRow = sheet.getLastRow();
      baseData = sheet.getRange(4, 1, lastRow, 3).getValues(); //年・日・曜日
      classData = sheet.getRange(4, 14, lastRow, 4).getValues(); //授業内容
      for (let i = 0; i < baseData.length; i++) {
        data.push(baseData[i].concat(classData[i])); //行ごとに結合
      }
      break;
    case 4:
      lastRow = sheet.getLastRow();
      baseData = sheet.getRange(4, 1, lastRow, 3).getValues(); //年・日・曜日
      classData = sheet.getRange(4, 19, lastRow, 4).getValues(); //授業内容
      for (let i = 0; i < baseData.length; i++) {
        data.push(baseData[i].concat(classData[i])); //行ごとに結合
      }
      break;
    default:
      break;
  }
  return data;
}