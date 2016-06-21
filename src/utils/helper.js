/**
 * Created by LzxHahaha on 2016/6/1.
 */

const ONE_HOUR = 1000 * 60 * 60;
const ONE_DAY = ONE_HOUR * 24;

export function formatTime(timeStamp = 0) {
  let time = new Date(timeStamp);

  let tempTime = new Date();
  tempTime.setHours(0);
  tempTime.setMinutes(0);
  tempTime.setSeconds(0);
  tempTime.setMilliseconds(0);

  let hours = time.getHours();
  hours = hours > 9 ? '' + hours : '0' + hours;
  let minutes = time.getMinutes();
  minutes = minutes > 9 ? '' + minutes : '0' + minutes;


  if (timeStamp > tempTime.getTime()) {
    return `今天 ${hours}:${minutes}`;
  }

  tempTime -= ONE_DAY;
  if (tempTime > tempTime) {
    return `昨天 ${hours}:${minutes}`;
  }

  return `${time.getFullYear()}/${time.getMonth()+1}/${time.getDate()} ${hours}:${minutes}`;
}

export function setTitle(t, postfix = true) {
  document.title = postfix ? `${t} - LZXHAHAHA` : t;
}