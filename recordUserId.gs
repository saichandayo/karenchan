const recordUserId = (userId, num) => {
  if (!userId) {
    Logger.log("User ID is not provided. Skipping recording.");
    return;
  }

  const sheetName = "ユーザ管理";
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let userSheet = spreadsheet.getSheetByName(sheetName);

  //「ユーザ管理」シートが存在しない場合は作成
  if (!userSheet) {
    userSheet = spreadsheet.insertSheet(sheetName);
    //ヘッダー行を追加
    userSheet.appendRow(["UserID", "初回登録日時", "学年", "リマインド"]);
    //ヘッダー行を太字にする
    userSheet.getRange("A1:C1").setFontWeight("bold");
    Logger.log(`Sheet "${sheetName}" created.`);
  }

  //A列(UserID列)のデータを取得して、指定のuserIdが存在するか確認
  const userIdColumnValues = userSheet.getRange("A:A").getValues().flat(); // 1次元配列に変換

  const rowIndex = userIdColumnValues.indexOf(userId);
  if (rowIndex === -1) {
    //新しいユーザー
    userSheet.appendRow([userId, new Date(), num, 1]);
  } else if (num !== undefined) {
    //既存ユーザーの学年を更新
    userSheet.getRange(rowIndex + 1, 3).setValue(num);
  }
}