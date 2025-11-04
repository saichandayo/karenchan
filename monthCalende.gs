//カレンダーFlex生成
const createCalendarFlex = (month, year) =>{
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();
  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
  const weekDayRow = {
    type: "box",
    layout: "horizontal",
    contents: weekDays.map(day => ({
      type: "text",
      text: day,
      size: "sm",
      color: "#666666",
      align: "center",
      flex: 1
    }))
  };
  const contents = [];
  contents.push(weekDayRow);
  


  let day = 1;
  for (let w = 0; w < 6; w++) {
    const row = [];
    for (let d = 0; d < 7; d++) {
      if (w === 0 && d < firstDay || day > daysInMonth) {
        row.push({
          type: "text",
          text: " ",
          size: "sm",
          color: "#cccccc",
          align: "center",
          flex: 1
        });
      } else if(d === 0) {
        row.push({
            type: "box",
            layout: "horizontal",
            flex: 1,
            action: {
              type: "message",
              label: `${day}`,
              text: `${month}/${day}`
            },
            contents: [
              {
                type: "text",
                color: "#FF0000",
                text: `${day}`,
                align: "center",
                size: "lg"
              }
            ]
        });
        day++;
      }else if(d === 6){
        row.push({
            type: "box",
            layout: "horizontal",

            flex: 1,
            action: {
              type: "message",
              label: `${day}`,
              text: `${month}/${day}`
            },
            contents: [
              {
                type: "text",
                color: "#0000FF",
                text: `${day}`,
                align: "center",
                size: "lg"
              }
            ]
        });
        day++;
      }else{
        row.push({
            type: "box",
            layout: "horizontal",
            flex: 1,
            action: {
              type: "message",
              label: `${day}`,
              text: `${month}/${day}`
            },
            contents: [
              {
                type: "text",
                text: `${day}`,
                align: "center",
                size: "lg"
              }
            ]
        });
        day++;
      }
      
    }
    contents.push({
      type: "box",
      layout: "horizontal",
      spacing: "sm",
      contents: row
    });
  }

  //前月・翌月計算
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  //カレンダー全体
  const flex = {
    type: "bubble",
    header: {
      type: "box",
      layout: "horizontal",
      contents: [
        {
          type: "text",
          text: `${year}年${month}月`,
          weight: "bold",
          size: "lg"
        }
      ]
    },
    body: {
      type: "box",
      layout: "vertical",
      spacing: "sm",
      contents: contents
    },
    footer: {
      type: "box",
      layout: "horizontal",
      spacing: "md",
      contents: [
        {
          type: "button",
          style: "primary",
          color: "#AAAAAA",
          action: {
            type: "postback",
            label: "← 前月",
            data: `calendar&${prevMonth}&${prevYear}`
          }
        },
        {
          type: "button",
          style: "primary",
          color: "#AAAAAA",
          action: {
            type: "postback",
            label: "翌月 →",
            data: `calendar&${nextMonth}&${nextYear}`
          }
        }
      ]
    }
  };

  return flex;
}