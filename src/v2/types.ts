export interface IDiscordEmbed {
  url: string;
  title: string;
  color: number;
  timestamp?: string;
  description?: string;
  image?: { url: string };
  author?: { name: string };
  fields?: { name: string; value: string; inline: boolean }[];
}

export interface IDiscordMessage {
  username: string;
  avatar_url: string;
  content?: string;
  embeds?: IDiscordEmbed[];
}

export interface IMessage {
  id: number;
  data: IDiscordMessage;
  count: number;
  sended_at: string;
}