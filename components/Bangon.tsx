import React from "react";

import {
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";

import ReactGA from "react-ga4";
import LinkText from "./LinkText";

import { IBangonMember } from "../types";

interface IBangonProp {
  name: string;
  data: IBangonMember;
}

export default function Bangon({ name, data: { status, info } }: IBangonProp) {
  return (
    <Popover
      autoFocus={false}
      onOpen={() => {
        ReactGA.event({
          category: "bangon",
          action: name,
        });
      }}
    >
      <PopoverTrigger>
        <Text
          color="blackAlpha.700"
          as="span"
          _hover={{ textDecoration: "underline" }}
        >
          {status}
        </Text>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          {info.map((item: string, idx: number) => (
            <LinkText text={item} key={idx} />
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
