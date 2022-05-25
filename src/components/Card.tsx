import { useState } from "react";

import {
  Box,
  Avatar,
  AvatarBadge,
  Flex,
  Heading,
  Text,
  Divider,
  Collapse,
  Stack,
  Image,
} from "@chakra-ui/react";

import {
  Icon,
  ChevronUpIcon,
  ChevronDownIcon,
  ViewIcon,
  TimeIcon,
  CalendarIcon,
} from "@chakra-ui/icons";

import Chat from "./Chat";
import { API_BASE_URL, ITEMS } from "../constants";
import { IChat } from "../types";

interface ICardProp {
  name: string;
  data: any;
  info: any;
  watch: any;
  wakzoo: Date;
}

function timeFormat(value: any, wakzoo: boolean = false) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );

  if (wakzoo && betweenTime < 5) return "접속 중";
  if (betweenTime < 1) return "방금 전";

  if (betweenTime < 60) {
    return `${betweenTime}분 전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간 전`;
  }

  return `${Math.floor(betweenTime / 60 / 24)}일 전`;
}

function uptimeFormat(value: any) {
  const today = new Date();
  const timeValue = new Date(value);

  const compare = new Date(
    today.getTime() - timeValue.getTime() - 9 * 60 * 60 * 1000
  );

  return compare.toTimeString().split(" ")[0];
}

export default function Card({
  name,
  info,
  watch,
  wakzoo,
  data: { id, color },
}: ICardProp) {
  const [open, setOpen] = useState<boolean>(false);
  const [chats, setChats] = useState<Array<IChat>>([]);

  if (!info || !watch) {
    return null;
  }

  const onOpen = () => {
    if (!open && !chats.length) {
      (async () => {
        const res = await fetch(`${API_BASE_URL}/chats?m=${name}`);
        const data = await res.json();

        setChats(data[name]);
      })();
    }

    setOpen(!open);
  };

  return (
    <Box
      maxW="3xl"
      borderWidth="3px"
      borderRadius="10px"
      padding="1rem"
      paddingBottom={2}
      marginBottom="10"
    >
      <Flex alignItems="center">
        <Avatar
          src={`${API_BASE_URL}/avatar?u=${id}`}
          size="2xl"
          bg="white"
          showBorder={true}
          borderWidth="5px"
          borderColor={info.live ? color : "#808080"}
        >
          {info.live && <AvatarBadge boxSize="1.25em" bg="green.500" />}
          {!info.live && watch.in && (
            <AvatarBadge boxSize="1.25em" bg="blue.500" />
          )}
        </Avatar>
        <Box marginLeft={5}>
          <Heading>{name}</Heading>
          <Text>{info.title}</Text>
          <Text>{info.game}</Text>
        </Box>

        <Flex marginLeft="auto" flexDirection="column" alignItems="center">
          {info.live && (
            <Flex alignItems="center" marginLeft="auto">
              <Text fontSize="xl">{info.viewers.toLocaleString()}</Text>
              <ViewIcon h={6} w={6} marginLeft={1} />
            </Flex>
          )}

          {info.live && (
            <Flex alignItems="center" marginLeft="auto">
              <Text fontSize="xl">{uptimeFormat(info.started_at)}</Text>
              <TimeIcon h={6} w={6} marginLeft={1} />
            </Flex>
          )}

          {!info.live && (
            <Flex alignItems="center" marginLeft="auto">
              <Text fontSize="xl">
                {timeFormat(info.live_updated_at * 1000)}
              </Text>
              <CalendarIcon h={6} w={6} marginLeft={1} />
            </Flex>
          )}

          <Flex alignItems="center" marginLeft="auto">
            <Text fontSize="xl">{timeFormat(wakzoo, true)}</Text>
            <Image
              h={6}
              w={6}
              marginLeft={1}
              src={require("../assets/cafe.png")}
            />
          </Flex>
        </Flex>
      </Flex>

      <Collapse in={open} unmountOnExit={true}>
        <Box marginTop={5}>
          <Divider borderBottomWidth={3} />

          {info.live && (
            <Box marginTop={5}>
              <iframe
                title="Twitch"
                src={`https://player.twitch.tv/?channel=${id}&parent=localhost&autoplay=false`}
                frameBorder={0}
                allowFullScreen={true}
                scrolling="no"
                width="730"
                height="410"
              />
            </Box>
          )}

          <Box>
            <Heading>시청 중</Heading>
            <Stack spacing={2} direction="row">
              {watch.see.map((user: string) => (
                <Avatar
                  size="lg"
                  bg="white"
                  src={`${API_BASE_URL}/avatar?u=${ITEMS[user].id}`}
                />
              ))}
            </Stack>
          </Box>

          <Box marginTop={5} borderWidth="3px" height="xs" overflow="scroll">
            {chats.map((chat: IChat) => (
              <Chat chat={chat} />
            ))}
          </Box>
        </Box>
      </Collapse>

      <Flex marginTop={5} justifyContent="center">
        <Icon
          as={open ? ChevronUpIcon : ChevronDownIcon}
          w={10}
          h={10}
          onClick={onOpen}
        />
      </Flex>
    </Box>
  );
}
