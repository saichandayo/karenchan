const searchTeacher = (teacher) => {
    const now =new Date();
    let url = 'スプレッドシートのURL';
    let sheet = SpreadsheetApp.openByUrl(url);
    sheet = sheet.getSheetByName("公開用カレンダー");
    const today = Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy/MM/dd");
    let data = [];
    let time_count = 0;
    let count = 1;
    let message = '授業中じゃないです。';

    var ranges = [
      { start: [9, 30], end: [11, 0] },
      { start: [11, 10], end: [12, 40] },
      { start: [13, 30], end: [15, 0] },
      { start: [15, 10], end: [16, 40] }
    ];

  for (let i = 0; i < ranges.length; i++) { //for内で何限目かのcountを作成(time_count)
    let s = new Date(now.getFullYear(), now.getMonth(), now.getDate(), ranges[i].start[0], ranges[i].start[1]);
    let e = new Date(now.getFullYear(), now.getMonth(), now.getDate(), ranges[i].end[0], ranges[i].end[1]);

    if(now >= s && now <= e){
      time_count = i + 1;
      break;
    }
  }
    const startRow = 4;
    let lastRow = sheet.getLastRow();
    let lastCol = sheet.getLastColumn();
    const numRows = lastRow - startRow + 1;  //= 368 - 4 + 1 = 365
    data = sheet.getRange(startRow, 1, numRows, lastCol).getValues();
    


    const parts = today.split("/");
    const today_year = parseInt(parts[0], 10);
    for (let i=0;i<data.length;i++) {
        let rowDate = Utilities.formatDate(new Date(today_year, data[i][0]-1, data[i][1]), "Asia/Tokyo", "yyyy/MM/dd");
          if (rowDate === today) {
            switch (time_count){
              case 0:
              //時間外の処理。
              message = '授業中じゃないです';
              break;
              case 1:
              //１限
              for(let j=3;j<=18;j+=5){
                let period1 = splitSubjectAndTeacher(data[i][j]);  // D列
                if(period1 && teacher === period1.teacher){
                  message = count + `年生の授業中です`;
                  break;
                }
                count++;
              }
              break;
              case 2:
              //２限
              for(let j=4;j<=19;j+=5){
                let period2 = splitSubjectAndTeacher(data[i][j]);  // D列
                if(period2 && teacher === period2.teacher){
                  message = count + `年生の授業中です`;
                  break;
                }
                count++;
              }
              break;
              case 3:
              //３限
              for(let j=5;j<=20;j+=5){
                let period3 = splitSubjectAndTeacher(data[i][j]);  // D列
                if(period3 && teacher === period3.teacher){
                  message = count + `年生の授業中です`;
                  break;
                }
                count++;
              }
              break;
              case 4:
              //４限
              for(let j=6;j<=21;j+=5){
                let period4 = splitSubjectAndTeacher(data[i][j]);  // D列
                if(period4 && teacher === period4.teacher){
                  message = count + `年生の授業中です`;
                  break;
                }
                count++;
              }
              break;
            }
        }
    }

    return message;
}