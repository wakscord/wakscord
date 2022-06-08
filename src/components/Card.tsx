import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

import {
  Box,
  Avatar,
  AvatarBadge,
  Flex,
  Heading,
  Text,
  Divider,
  Collapse,
  Image,
  Spinner,
} from "@chakra-ui/react";

import {
  Icon,
  ChevronUpIcon,
  ChevronDownIcon,
  ViewIcon,
  TimeIcon,
  CalendarIcon,
  EditIcon,
} from "@chakra-ui/icons";

import "../css/Card.css";

import ReactGA from "react-ga4";
import Chat from "./Chat";
import Bangon from "./Bangon";
import Tooltip from "./Tooltip";

import { timeFormat, uptimeFormat, addAlpha } from "../utils";
import { API_BASE_URL, ITEMS, AVAILABLE_ITEMS } from "../constants";
import {
  IUserData,
  IInfo,
  IWatchMember,
  IBangonMember,
  IChat,
  IWakzoo,
} from "../types";

import Wakzoo from "./Wakzoo";

interface ICardProp {
  name: string;
  data: IUserData;
  info: IInfo;
  watch: IWatchMember;
  wakzoo: IWakzoo;
  bangon: IBangonMember;
}

export default function Card({
  name,
  info,
  watch,
  wakzoo,
  bangon,
  data: { id, color },
}: ICardProp) {
  const [open, setOpen] = useState<boolean>(false);
  const [chats, setChats] = useState<Array<IChat>>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [chatLoaded, setChatLoaded] = useState<boolean>(false);
  const [chatEnd, setChatEnd] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);

  const chatBox = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView();

  const getExcludes = () => {
    const users =
      (JSON.parse(localStorage.getItem("users") ?? "null") as string[]) ??
      AVAILABLE_ITEMS;

    return AVAILABLE_ITEMS.filter((x) => !users.includes(x)).join(" ");
  };

  useEffect(() => {
    if ((info && wakzoo) || bangon) {
      setLoaded(true);
    }
  }, [info, wakzoo, bangon]);

  useEffect(() => {
    if (inView) {
      (async () => {
        if (!chats[0]) return;

        const res = await fetch(
          `${API_BASE_URL}/chats?m=${name}&s=${chats[0].id}&e=${getExcludes()}`
        );
        const data = await res.json();

        setHeight(chatBox.current?.scrollHeight || 0);

        if (data[name][0] === chats[0]) {
          setChatEnd(true);
          return;
        }

        setChats([...data[name], ...chats]);
      })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => {
    if (chatBox.current)
      chatBox.current.scrollTop = chatBox.current.scrollHeight - height;
  }, [chatLoaded, height]);

  const onOpen = () => {
    if (!open && !chats.length) {
      ReactGA.event({
        category: "open",
        action: name,
      });

      (async () => {
        const res = await fetch(
          `${API_BASE_URL}/chats?m=${name}&e=${getExcludes()}`
        );
        const data = await res.json();

        setChats(data[name]);
        setChatLoaded(true);
      })();
    }

    setOpen(!open);
  };

  if (!loaded) {
    return (
      <Box
        maxW="3xl"
        borderRadius="10px"
        padding="1rem"
        marginBottom="10"
        bg={addAlpha(color, 0.2)}
        boxShadow="2px 2px 10px 5px rgb(0 0 0 / 20%);"
      >
        <Flex alignItems="center">
          <Avatar
            src={`${API_BASE_URL}/avatar?u=${id}`}
            size="2xl"
            bg="transparent"
            showBorder={true}
            borderWidth="5px"
            borderColor="#808080"
            as="a"
            href={`https://twitch.tv/${id}`}
            target="_blank"
          />

          <Box marginLeft={5}>
            <Heading as="a" href={`https://twitch.tv/${id}`} target="_blank">
              {name}
            </Heading>
            <Text>로딩 중...</Text>
          </Box>
        </Flex>
      </Box>
    );
  }

  return (
    <Box
      maxW="3xl"
      borderRadius="10px"
      padding="1rem"
      paddingBottom={2}
      marginBottom="10"
      bg={addAlpha(color, 0.2)}
      boxShadow="2px 2px 10px 5px rgb(0 0 0 / 20%);"
    >
      <Flex alignItems="center" className="mfd">
        <Flex alignItems="center" className="mmr">
          <Avatar
            src={`${API_BASE_URL}/avatar?u=${id}`}
            size="2xl"
            bg="transparent"
            showBorder={true}
            borderWidth="5px"
            borderColor={info.live ? color : "#808080"}
            as="a"
            href={`https://twitch.tv/${id}`}
            target="_blank"
          >
            {info.live && (
              <Tooltip label="방송 중">
                <AvatarBadge boxSize="1em" bg="green.500" border="null" />
              </Tooltip>
            )}

            {!info.live && watch.in && (
              <Tooltip label="채팅방에 접속 중">
                <AvatarBadge boxSize="1em" bg="blue.500" border="null" />
              </Tooltip>
            )}
          </Avatar>
          <Box marginLeft={5}>
            <Heading as="a" href={`https://twitch.tv/${id}`} target="_blank">
              {name}
            </Heading>
            <Text color="blackAlpha.700">{info.title}</Text>

            {info.live && <Text color="blackAlpha.700">{info.game}</Text>}
            {!info.live && bangon && <Bangon name={name} data={bangon} />}
          </Box>
        </Flex>

        <Flex
          w="180px"
          marginLeft="auto"
          flexDirection="column"
          alignItems="center"
        >
          {info.live && (
            <>
              <Flex alignItems="center" marginLeft="auto">
                <Text fontSize="xl">{info.viewers.toLocaleString()}</Text>
                <Tooltip label="시청자">
                  <ViewIcon h={6} w={6} marginLeft={1} />
                </Tooltip>
              </Flex>
              <Flex alignItems="center" marginLeft="auto">
                <Text fontSize="xl">{uptimeFormat(info.started_at)}</Text>
                <Tooltip label="업타임">
                  <TimeIcon h={6} w={6} marginLeft={1} />
                </Tooltip>
              </Flex>
            </>
          )}

          {!info.live && (
            <Flex alignItems="center" marginLeft="auto">
              <Text fontSize="xl">
                {timeFormat(info.live_updated_at * 1000)}
              </Text>
              <Tooltip label="최근 방송">
                <CalendarIcon h={6} w={6} marginLeft={1} />
              </Tooltip>
            </Flex>
          )}

          <Flex alignItems="center" marginLeft="auto">
            <Text fontSize="xl">
              {timeFormat(info.title_updated_at * 1000)}
            </Text>
            <Tooltip label="방송 제목 변경">
              <EditIcon h={6} w={6} marginLeft={1} />
            </Tooltip>
          </Flex>

          {window.localStorage.getItem("cafe") && (
            <Box ml="auto">
              <Wakzoo name={name} data={wakzoo}>
                <Flex alignItems="center">
                  <Text
                    as="p"
                    fontSize="xl"
                    _hover={{ textDecoration: "underline" }}
                  >
                    {timeFormat(wakzoo.time * 1000, true)}
                  </Text>
                  <Tooltip label="왁물원 접속">
                    <Image
                      h={6}
                      w={6}
                      marginLeft={1}
                      src={require("../assets/cafe.png")}
                    />
                  </Tooltip>
                </Flex>
              </Wakzoo>
            </Box>
          )}
        </Flex>
      </Flex>

      <Collapse in={open} unmountOnExit={true}>
        <Box marginTop={5}>
          <Divider borderBottomWidth={3} borderColor="blackAlpha.600" />
          {info.live && (
            <Box marginTop={5}>
              <iframe
                title="Twitch"
                src={`https://player.twitch.tv/?channel=${id}&parent=wakscord.xyz&autoplay=false`}
                frameBorder={0}
                allowFullScreen={true}
                scrolling="no"
                style={{
                  width: "100%",
                  aspectRatio: "16 / 9",
                }}
              />
            </Box>
          )}

          {info.live && (
            <Divider
              marginTop={5}
              borderBottomWidth={3}
              borderColor="blackAlpha.600"
            />
          )}

          {watch.see.length > 0 && (
            <Box marginTop={5}>
              <Text fontSize="1.25rem" fontWeight="bold">
                {name}님이 시청 중
              </Text>

              {watch.see.map((user: string) => (
                <Tooltip key={user} label={user}>
                  <Avatar
                    size="lg"
                    bg="transparent"
                    src={`${API_BASE_URL}/avatar?u=${ITEMS[user].id}`}
                    borderWidth={2}
                    style={{
                      WebkitMarginEnd: "-0.75rem",
                      marginInlineEnd: "-0.75rem",
                    }}
                  />
                </Tooltip>
              ))}
            </Box>
          )}
          <Box
            ref={chatBox}
            className="chatBox"
            padding={2}
            marginTop={5}
            borderWidth="3px"
            height="xs"
            overflowY="scroll"
            bg="rgba(255 255 255 / 20%)"
            borderRadius="10px"
          >
            {chats && chatEnd && (
              <Flex justifyContent="center" margin={5} ref={ref}>
                <Spinner color="black" />
              </Flex>
            )}

            {chats &&
              chats.map((chat: IChat, idx: number) => (
                <Chat chat={chat} key={idx} />
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
