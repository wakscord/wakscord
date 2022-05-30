export interface IUserData {
  id: string;
  color: string;
}

export interface IEmotes {
  [index: string]: Array<string>;
}

export interface IChat {
  id: number;
  author: string;
  content: string;
  emotes?: IEmotes;
  time: string;
}

export interface IInfo {
  live: boolean;
  title: string;
  game: string;
  viewers: number;
  started_at: string;
  title_updated_at: number;
  live_updated_at: number;
}

export interface IWakzoo {
  time: number;
  lastArticle: { idx: string; subject: string; time: number };
  lastReply: { idx: string; subject: string; time: number };
}

export interface IBangonMember {
  status: string;
  info: string[];
}

export interface IBangon {
  info: { idx: string; date: string; comment: string[] };
  members: { [name: string]: IBangonMember };
}

export interface IWatchMember {
  see: string[];
  in: boolean;
}

export interface IWatch {
  [name: string]: IWatchMember;
}

export interface Data {
  info: { [name: string]: IInfo };
  wakzoo: { [name: string]: IWakzoo };
  bangon: IBangon;
  watch: IWatch;
}
