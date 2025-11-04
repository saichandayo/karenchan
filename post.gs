const doPost = (e) => {
  //jsonデータからevent情報を取得
  const json = JSON.parse(e.postData.contents);
  const events = json.events;


  //グローバル変数の宣言
  let messageText = "";
  let reply_token;
  let num;  //学年
  let user_message = "";
  let UID = events[0].source.userId;
  const state1 = getUserState(UID); //初期はdefault
  let state2 = getTeacherState(UID);  //初期はdefault
  let remind_kind = getRemindState(UID);  //初期は1

  for (const event of events) {
    if(event.type === "follow") { //followイベントの処理
      sendButtonTemplate(event);
      continue;
    }

    if(event.type === "message" && event.message && event.message.text) { //messageイベントの処理
      messageText = event.message.text;
      reply_token = event.replyToken;
      const years = ['１年生', '２年生', '３年生', '４年生'];
      const yearNums = [1, 2, 3, 4];

      for(let i = 0; i < years.length; i++) {
        if(messageText === years[i]) {
          num = yearNums[i];
          user_message = `登録ありがとうございます!\n${num}年生で登録しました!`;
          replyTextMessage(reply_token, user_message);
          break;
        }
      }

      if(num !== undefined){
        //シートとUIDにuserIdを入れる
        recordUserId(UID, num);
      }
    }else if (event.type === 'postback') {  //postbackイベントの処理
      reply_token = event.replyToken;
      const pb_data = event.postback.data;
      const pb_params = pb_data.split("&");
      const pb_action = pb_params[0];
      let flex = '';

       if (pb_action === 'calendar') {  //月次カレンダーの処理
        const pb_month = parseInt(pb_params[1], 10);
        const pb_year = parseInt(pb_params[2], 10);

        const currentKey = pb_year * 100 + pb_month; //202504のように数値化する
        const startKey = 202504;
        const endKey = 202603;

        if((currentKey >= startKey) && (currentKey <= endKey)){
          flex = createCalendarFlex(pb_month, pb_year);
        }

        replyFlex(reply_token, flex);
      }
    }
  }

  num = getNum(UID);

  //変数の定義
  let data = [];
  data = getCalendarLog(num);
  let date;
  const today = Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy/MM/dd");
  const today_detail = new Date(`${today} 00:00:00+0900`);
  const parts = today.split("/");
  const today_year = parseInt(parts[0], 10); // 任意の年
  const today_month = parseInt(parts[1], 10) - 1;
  const today_day = parseInt(parts[2], 10);
  let monday = new Date();
  const dayIndex = today_detail.getDay(); //曜日の取得
  const days = ['月曜日','火曜日','水曜日','木曜日','金曜日'];
  const daymark = ['🟣','🔴','🔵','🟢','🟡']; //日付の色
  const days_all = ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'];
  const daymark_all = ['🟠','🟣','🔴','🔵','🟢','🟡','🟤']; //日付の色
  let youbi;
  let month = 0;
  let day = 0;

  if(messageText.includes("/")){  //「4/1」などに対する前処理
    const text = messageText;
    const parts = text.split("/");
    month = parseInt(parts[0], 10) - 1; // JavaScriptの月は0始まり（1月=0）
    day = parseInt(parts[1], 10);
    let year = 0;
    if(month >= 3 && month <= 11){
      year = 2025;
    }else if(month <= 2){
      year = 2026;
    }
    date = new Date(`${year}/${month + 1}/${day} 00:00:00+0900`);
    youbi = date.getDay();
  }

  if(state1 === "waiting_for_inquiry"){ //お問合せの処理
    sendGmail(messageText);  // 問い合わせ内容を送信
    replyTextMessage(reply_token, "お問い合わせありがとうございます。");
    setUserState(UID, "default");
  }else if(state1 === "waiting_for_search"){  //先生検索機能
    switch (messageText){
    case '〇〇先生':
      setTeacherName(UID, '○○');
      break;
    case '○○先生':
      setTeacherName(UID, '○○');
      break;
    case '○○先生':
      setTeacherName(UID, '○○');
      break;
    case '○○先生':
      setTeacherName(UID, '○○');
      break;
    }
    state2 = getTeacherState(UID);
    let message = searchTeacher(state2);
    replyTextMessage(reply_token, message);
    setTeacherName(UID, "default");
  }else if(messageText === "今日の予定"){ //当日の予定の処理
    let message = `${daymark_all[dayIndex]}【${today_month+1}/${today_day}-${days_all[dayIndex]}】 (${num}年)\n\n`;
    message += message_get(data,today);

    replyTextMessage(reply_token, message);

  }else if(messageText === "明日の予定"){ //明日の予定の処理
    const tomorrowDate = today.split('/').map(x => parseInt(x, 10));
    let tomorrow = Utilities.formatDate(new Date(tomorrowDate[0], tomorrowDate[1]-1, tomorrowDate[2] + 1), "Asia/Tokyo", "yyyy/MM/dd");

    let message = `${daymark_all[(dayIndex+1)%7]}【${today_month+1}/${today_day+1}-${days_all[(dayIndex+1)%7]}】 (${num}年)\n\n`;;//messageの定義
    message += message_get(data,tomorrow);

    replyTextMessage(reply_token, message);

  }else if(messageText === "明後日の予定"){ //明後日の予定の処理
    const afterTomorrowDate = today.split('/').map(x => parseInt(x, 10));
    let afterTomorrow = Utilities.formatDate(new Date(afterTomorrowDate[0], afterTomorrowDate[1]-1, afterTomorrowDate[2] + 2), "Asia/Tokyo", "yyyy/MM/dd");
    let message = `${daymark_all[(dayIndex+2)%7]}【${today_month+1}/${today_day+2}-${days_all[(dayIndex+2)%7]}】 (${num}年)\n\n`;
    message += message_get(data,afterTomorrow);
    replyTextMessage(reply_token, message);

  }else if(messageText === "今週の予定"){  //一週間の予定の処理
    let message = `🗓️今週の予定 (${num}年)\n\n`;
    

    switch(dayIndex){
      case 0:
        monday = new Date(today_year, today_month, today_day + 1);
        break;
      case 1:
        monday = new Date(today_year, today_month, today_day);
        break;
      case 2:
        monday = new Date(today_year, today_month, today_day - 1);
        break;
      case 3:
        monday = new Date(today_year, today_month, today_day - 2);
        break;
      case 4:
        monday = new Date(today_year, today_month, today_day - 3);
        break;
      case 5:
        monday = new Date(today_year, today_month, today_day - 4);
        break;
      case 6:
        monday = new Date(today_year, today_month, today_day - 5);
        break;
    }


    for (let i = 0; i < 5; i++) { // 月〜金（5日分）
      const target = new Date(monday); // 毎回mondayを複製
      target.setDate(target.getDate() + i); // i日後にする
      const formatted = Utilities.formatDate(target, "Asia/Tokyo", "yyyy/MM/dd");

      const parts1 = formatted.split("/");
      const formatted_month = parseInt(parts1[1], 10) - 1;
      const formatted_day = parseInt(parts1[2], 10);

      message += daymark[i] + "【" +(formatted_month+1) + "/" + formatted_day + "-" + days[i] + '】\n';
      message += message_get(data, formatted);
      message += '\n\n\n';//改行で調整
    }
    message = message.replace(/\n\n\n$/, '');//最後の改行を排除


    replyTextMessage(reply_token, message);

  }else if(messageText === "来週の予定"){  //来週の予定の処理
    let message = `🗓️来週の予定 (${num}年)\n\n`;
    
    switch(dayIndex){ //dayIndex->曜日ごとのindex。曜日ごとに来週の月曜日を求める処理をしている。
      case 0:
        monday = new Date(today_year, today_month, today_day + 8);
        break;
      case 1:
        monday = new Date(today_year, today_month, today_day + 7);
        break;
      case 2:
        monday = new Date(today_year, today_month, today_day + 6);
        break;
      case 3:
        monday = new Date(today_year, today_month, today_day + 5);
        break;
      case 4:
        monday = new Date(today_year, today_month, today_day + 4);
        break;
      case 5:
        monday = new Date(today_year, today_month, today_day + 3);
        break;
      case 6:
        monday = new Date(today_year, today_month, today_day + 2);
        break;
    }


    for (let i = 0; i < 5; i++) { // 月〜金（5日分）
      const target = new Date(monday); // 毎回mondayを複製
      target.setDate(target.getDate() + i); // i日後にする
      const formatted = Utilities.formatDate(target, "Asia/Tokyo", "yyyy/MM/dd");

      const parts1 = formatted.split("/");
      const formatted_month = parseInt(parts1[1], 10) - 1;
      const formatted_day = parseInt(parts1[2], 10);  

      message += daymark[i] + "【" +(formatted_month+1) + "/" + formatted_day + "-" + days[i] + '】\n';
      message += message_get(data, formatted);
      message += '\n\n\n';
    }
    message = message.replace(/\n\n\n$/, '');


    replyTextMessage(reply_token, message);

  
  }else if (messageText === "月の予定") { //月の予定の処理

    const flex = createCalendarFlex(today_month+1, today_year);
    replyFlex(reply_token, flex);


  }else if(date instanceof Date){ //date型の場合「4/1」などに対する処理
    const dateStr = Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy/MM/dd');

    let message = `${daymark_all[youbi]}【${month + 1}/${day}-${days_all[youbi]}】(${num}年)\n\n`;;//messageの定義
    message += message_get(data, dateStr);

    replyTextMessage(reply_token, message);
  }else if (messageText === "お問い合わせ") {
    replyTextMessage(reply_token, "お問い合わせ内容を書いてください。");
    setUserState(UID, "waiting_for_inquiry");  // 状態を保存
  }else if(messageText.includes("先生どこにいる？")){
    sendButtonTemplate2(reply_token);
    setUserState(UID, "waiting_for_search");  // 状態を保存
  }else if(messageText === "リマインダーの設定"){
    sendButtonTemplate5(reply_token);
  }else if(messageText === "当日のリマインダー"){
    remind_kind = setRemindState(UID, 1);
    replyQuickReply(reply_token);
  }else if(messageText === "一週間のリマインダー"){
    remind_kind = setRemindState(UID, 2);
    replyQuickReply(reply_token);
  }else if(messageText === "リマインダーON"){
    recordReminder(UID, remind_kind, 1);
    replyTextMessage(reply_token, "リマインダーをONにしました");
  }else if(messageText === "リマインダーOFF"){
    recordReminder(UID, remind_kind, 0);
    replyTextMessage(reply_token, "リマインダーをOFFにしました");
  }else if(messageText === "リマインダーの設定状況"){
    checkRemind(UID, reply_token);
  }else if(messageText === "使用方法"){
    replyTextMessage(reply_token, "使用方法のページ\nhttps://j23012.bitbucket.io/");
  }else if(messageText === "その他"){
    sendButtonTemplate3(reply_token);
  }else if(messageText === "今後の予定"){
    sendButtonTemplate4(reply_token);
  }else{
　　//elseで文を繰り返すだけの処理
    const url = 'https://api.line.me/v2/bot/message/reply';
    const bearer = '自分のbearerキー';
    let apiKey = "Bearer "+bearer;
    let option = {
      'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': apiKey,
      },
      'method': 'post',
      'payload': JSON.stringify({
        'replyToken': reply_token,
        'messages': [{
          'type': 'text',
          'text': messageText,
        }],
      }),
    }
    UrlFetchApp.fetch(url,option);
    return;
  }
} 