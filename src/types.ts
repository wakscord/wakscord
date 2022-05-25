export interface IEmotes {
  [index: string]: Array<string>;
}

export interface IChat {
  author: string;
  content: string;
  emotes?: IEmotes;
  time: string;
}
