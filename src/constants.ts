import { IUserData } from "./types";

type stringIndex = {
  [index: string]: IUserData;
};

export const API_BASE_URL = "https://api.isedol-cctv.xyz";

export const ITEMS: stringIndex = {
  아이네: { id: "vo_ine", color: "#8a2be2" },
  징버거: { id: "jingburger", color: "#f0a957" },
  릴파: { id: "lilpaaaaaa", color: "#000080" },
  주르르: { id: "cotton__123", color: "#800080" },
  고세구: { id: "gosegugosegu", color: "#467ec6" },
  비챤: { id: "viichan6", color: "#85ac20" },
  우왁굳: { id: "woowakgood", color: "#cfaa71" },
  천양: { id: "chunyangkr", color: "#acfef8" },
  뢴트게늄: { id: "111roentgenium", color: "#ff69b4" },
};

export const AVAILABLE_ITEMS = [
  "우왁굳",
  "아이네",
  "징버거",
  "릴파",
  "주르르",
  "고세구",
  "비챤",
  "뢴트게늄",
  "천양",
  "엔젤",
  "김치만두번영택사스가",
  "곽춘식",
  "단답벌레",
  "새우튀김",
  "해루석",
  "미츠네하쿠",
  "프리터",
  "독고혜지",
  "부정형인간",
  "풍신",
  "왁파고",
  "도파민박사",
  "캘리칼리데이비슨",
  "소피아",
  "권민",
  "융터르",
  "비즈니스킨",
  "비밀소녀",
  "히키킹",
  "이덕수할아바이",
  "사냥우벌",
  "준99",
  "별나무",
  "피카온",
  "밀크라지",
  "똥치킨",
  "마왕",
  "제갈공띵",
  "북기",
  "남궁혁",
  "보도도",
  "영바이브",
  "캔인데요",
  "매니저",
  "VIP",
];
