import { Fragment } from "react";
import { Box, Text } from "@chakra-ui/react";

import Emote from "./Emote";
import Tooltip from "./Tooltip";
import { IChat } from "../types";
import { ITEMS } from "../constants";

interface IChatProp {
  chat: IChat;
}

interface ISeguTextProp {
  segu: boolean;
  children: React.ReactNode;
}

function SeguText({ segu, children }: ISeguTextProp) {
  const noSegu = Boolean(localStorage.getItem("noSegu"));

  if (segu && !noSegu) {
    return (
      <Text
        as="span"
        verticalAlign="middle"
        fontFamily="SeguSegu"
        fontSize="1.4rem"
      >
        {children}
      </Text>
    );
  }

  return (
    <Text as="span" verticalAlign="middle">
      {children}
    </Text>
  );
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
  let words = "";
  content.split(" ").forEach((word: string) => {
    const start = index;
    const end = index + word.length - 1;
    const idx = `${start}-${end}`;

    index += word.length + 1;

    if (emotes_[idx]) {
      if (words) {
        render.push(<SeguText segu={author === "고세구"}>{words}</SeguText>);

        words = "";
      }

      render.push(<Emote id={emotes_[idx]} name={word} />);
    } else {
      words += `${word} `;
    }
  });

  if (words) {
    render.push(<SeguText segu={author === "고세구"}>{words}</SeguText>);
  }

  return (
    <Box>
      <Tooltip label={time}>
        <Text as="span" verticalAlign="middle" fontSize=".8rem" color="#4C4C4C">
          {time.split(" ")[1].substring(0, 5)}{" "}
        </Text>
      </Tooltip>
      <Text
        as="span"
        verticalAlign="middle"
        color={ITEMS[author] ? ITEMS[author].color : "gray"}
        fontWeight={ITEMS[author] ? "bold" : "normal"}
      >
        {author}
      </Text>
      <Text as="span" verticalAlign="middle">
        :{" "}
      </Text>

      {render.map((el, index) => (
        <Fragment key={index}>{el}</Fragment>
      ))}
    </Box>
  );
}
