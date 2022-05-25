import { Box, Text } from "@chakra-ui/react";

import Emote from "./Emote";
import { IChat } from "../types";

interface IChatProp {
  chat: IChat;
}

export default function Chat({
  chat: { author, content, emotes, time },
}: IChatProp) {
  const render: Array<any> = [];

  const emotes_: any = {};
  if (emotes) {
    for (const [id, indexes] of Object.entries(emotes)) {
      for (const index of indexes) {
        emotes_[index] = id;
      }
    }
  }

  let index = 0;
  content.split(" ").forEach((word) => {
    const start = index;
    const end = index + word.length - 1;
    const idx = `${start}-${end}`;

    index += word.length + 1;

    if (emotes_[idx]) {
      render.push(<Emote id={emotes_[idx]} name={word} />);
    } else {
      render.push(
        <Text as="span" verticalAlign="middle">
          {word}{" "}
        </Text>
      );
    }
  });

  return (
    <Box>
      <Text as="span" verticalAlign="middle">
        {author}:{" "}
      </Text>
      {render}
    </Box>
  );
}
