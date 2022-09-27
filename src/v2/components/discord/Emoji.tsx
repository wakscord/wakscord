import styled from "styled-components";

interface IEmojiProp {
  text: string;
}

const emojiRegex = /<(a?):[a-zA-Z0-9]+:(\d+)>/;

export default function Emoji({ text }: IEmojiProp) {
  const exec = emojiRegex.exec(text);

  if (!exec) return null;

  const ext = exec[1] === "a" ? "gif" : "png";
  const id = exec[2];

  return <EmojiImage src={`https://cdn.discordapp.com/emojis/${id}.${ext}`} />;
}

export const EmojiImage = styled.img`
  width: 48px;
  height: 48px;

  display: inline-block;
  vertical-align: middle;

  user-select: none;
  pointer-events: none;
`;
