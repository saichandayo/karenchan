const getNum = (UserId) => {
  const user_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ユーザ管理");
  const lastRow = user_sheet.getLastRow(); //データのある最終行を取得
  const lastCol = user_sheet.getLastColumn(); //データのある最終列を取得
  let user_value = user_sheet.getRange(1, 1 , lastRow, lastCol).getValues();
  let num;

  for(let i=0;i<user_value.length;i++){
    if(user_value[i][0] === UserId){
      num = parseInt(user_value[i][2]);
    }
  }
  return num;
}