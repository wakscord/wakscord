export function timeFormat(value: any, wakzoo: boolean = false) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );

  if (wakzoo && betweenTime < 5) return "접속 중";
  if (betweenTime < 1) return "방금 전";

  if (betweenTime < 60) {
    return `${betweenTime}분 전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간 전`;
  }

  return `${Math.floor(betweenTime / 60 / 24)}일 전`;
}

export function uptimeFormat(value: any) {
  const today = new Date();
  const timeValue = new Date(value);

  const compare = new Date(
    today.getTime() - timeValue.getTime() - 9 * 60 * 60 * 1000
  );

  return compare.toTimeString().split(" ")[0];
}

export function addAlpha(color: string, opacity: number) {
  var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}
