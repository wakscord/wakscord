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
