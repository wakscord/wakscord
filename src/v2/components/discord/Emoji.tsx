import styled from "styled-components";

interface IEmojiProp {
  text: string;
  small?: boolean;
}

const emojiRegex = /<(a?):[a-zA-Z0-9]+:(\d+)>/;

export default function Emoji({ text, small }: IEmojiProp) {
  const exec = emojiRegex.exec(text);

  if (!exec) return null;

  const ext = exec[1] === "a" ? "gif" : "png";
  const id = exec[2];

  return (
    <Image
      small={Boolean(small)}
      src={`https://cdn.discordapp.com/emojis/${id}.${ext}`}
    />
  );
}

const Image = styled.img<{ small: boolean }>`
  width: ${(props) => (props.small ? "22" : "48")}px;
  height: ${(props) => (props.small ? "22" : "48")}px;

  display: inline-block;
  vertical-align: middle;

  user-select: none;
  pointer-events: none;
`;
