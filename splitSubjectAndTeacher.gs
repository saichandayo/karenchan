const splitSubjectAndTeacher = (cellText) => {
  if(!cellText || cellText.trim() === "／" ) return null;  //「/」なら無視

    let parts = cellText.split('\n');
    let subject = parts[0] ? parts[0].trim() : "";
    let teacher = "";
    if(parts.length > 1){
      teacher = parts[1].trim();
      let teacherParts = teacher.split(/\s+/);
      teacher = teacherParts[teacherParts.length - 1];  //先生名だけ抜き出す
    }
  return { subject, teacher };
}