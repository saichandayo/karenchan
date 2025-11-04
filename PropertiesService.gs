//デフォルトを取得。初期化みたいな感じ
const getUserState = (userId) =>{
  const props1 = PropertiesService.getUserProperties();
  return props1.getProperty(userId) || "default";
}

const getTeacherState = (userId) =>{
  const props2 = PropertiesService.getUserProperties();
  return props2.getProperty(userId) || "default";
}

const getRemindState = (userId) =>{
  const props3 = PropertiesService.getUserProperties();
  return parseInt(props3.getProperty(userId)) || 1;
}

// 状態を保存
const setUserState = (userId, state) =>{
  const props1 = PropertiesService.getUserProperties();
  props1.setProperty(userId, state);
}

//先生の名前を保存
const setTeacherName = (userId, teacher) =>{
  const props2 = PropertiesService.getUserProperties();
  props2.setProperty(userId, teacher);
}

//リマインドの状態を保存。1->当日の設定, 2->一週間の設定
const setRemindState = (userId, remind_kind) =>{
  const props3 = PropertiesService.getUserProperties();
  props3.setProperty(userId, remind_kind);
}