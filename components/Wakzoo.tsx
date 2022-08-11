import React from "react";

import {
  Box,
  Text,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";

import ReactGA from "react-ga4";

import { timeFormat } from "../utils";
import { IWakzoo } from "../types";

interface IBangonProp {
  name: string;
  data: IWakzoo;
  children: React.ReactNode;
}

export default function Wakzoo({
  name,
  children,
  data: { lastArticle, lastReply, lastLike },
}: IBangonProp) {
  return (
    <Popover
      autoFocus={false}
      onOpen={() => {
        ReactGA.event({
          category: "wakzoo",
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
          {children}
        </Text>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Box>
            <Text fontWeight="bold">
              최근 글 ({timeFormat(lastArticle.time * 1000)})
            </Text>
            <Link
              href={`https://cafe.naver.com/steamindiegame/${lastArticle.idx}`}
              color="#2f7dfb"
              target="_blank"
            >
              {lastArticle.subject}
            </Link>
          </Box>

          <Box mt={2}>
            <Text fontWeight="bold">
              최근 댓글 ({timeFormat(lastReply.time * 1000)})
            </Text>
            <Link
              href={`https://cafe.naver.com/steamindiegame/${lastReply.idx}`}
              color="#2f7dfb"
              target="_blank"
            >
              {lastReply.subject}
            </Link>
          </Box>

          <Box mt={2}>
            <Text fontWeight="bold">
              최근 좋아요 ({timeFormat(lastLike.time * 1000)})
            </Text>
            <Link
              href={`https://cafe.naver.com/steamindiegame/${lastLike.idx}`}
              color="#2f7dfb"
              target="_blank"
            >
              {lastLike.subject}
            </Link>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
