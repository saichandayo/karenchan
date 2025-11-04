const message_get = (data, day) => {
  let found = false;
  let message = '';
  const parts = day.split("/");
  const today_year = parseInt(parts[0], 10); // 任意の年
  let rowMonth = 0;
  let rowDay = 0;
  let message_temp = [null, null, null, null];  // 1限〜4限の内容を格納

  for (let i = 0; i < data.length; i++) {
    rowMonth = parseInt(data[i][0]) - 1;  // 月（0始まり）
    rowDay = parseInt(data[i][1]);  // 日
    const rowDate = Utilities.formatDate(new Date(today_year, rowMonth, rowDay), "Asia/Tokyo", "yyyy/MM/dd");
    
    if (rowDate === day) {
      // 1限〜4限の取得
      const periods = [data[i][3], data[i][4], data[i][5], data[i][6]];

      for (let j = 0; j < 4; j++) {
        const result = splitSubjectAndTeacher(periods[j]);
        if (result !== null) {
          message_temp[j] = `${j+1}限 ${result.teacher}:${result.subject}\n`;
          found = true;
        }
      }
    }
  }

  if (!found) {
    message += "休日です\n";
  } else {
    let lastLessonIndex = -1;
    for (let i = 3; i >= 0; i--) {
      if (message_temp[i] !== null) {
        lastLessonIndex = i;
        break;
      }
    }

    for (let j = 0; j <= lastLessonIndex; j++) {
      if (message_temp[j] === null) {
        message += `${j+1}限 空き\n`;
      } else {
        message += message_temp[j];
      }
    }
  }

  message = message.replace(/\n$/, '');
  return message;
};