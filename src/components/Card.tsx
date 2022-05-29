import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

import {
  Box,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Flex,
  Heading,
  Text,
  Divider,
  Collapse,
  Image,
  Tooltip,
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

import Chat from "./Chat";
import Bangon from "./Bangon";

import { API_BASE_URL, ITEMS } from "../constants";
import { IUserData, IInfo, IWatchMember, IBangonMember, IChat } from "../types";

interface ICardProp {
  name: string;
  data: IUserData;
  info: IInfo;
  watch: IWatchMember;
  wakzoo: Date;
  bangon: IBangonMember;
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

function addAlpha(color: string, opacity: number) {
  var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
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
  const [height, setHeight] = useState<number>(0);

  const chatBox = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView();

  useEffect(() => {
    if ((info && wakzoo) || bangon) {
      setLoaded(true);
    }
  }, [info, wakzoo, bangon]);

  useEffect(() => {
    if (inView) {
      (async () => {
        const res = await fetch(
          `${API_BASE_URL}/chats?m=${name}&s=${chats[0].id}`
        );
        const data = await res.json();

        setHeight(chatBox.current?.scrollHeight || 0);
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
      (async () => {
        const res = await fetch(`${API_BASE_URL}/chats?m=${name}`);
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
        borderWidth="3px"
        borderRadius="10px"
        padding="1rem"
        marginBottom="10"
        bg={addAlpha(color, 0.4)}
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
          />

          <Box marginLeft={5}>
            <Heading as="a" href={`https://twitch.tv/${id}`}>
              {name}
            </Heading>
          </Box>
        </Flex>
      </Box>
    );
  }

  return (
    <Box
      maxW="3xl"
      borderWidth="3px"
      borderRadius="10px"
      padding="1rem"
      paddingBottom={2}
      marginBottom="10"
      bg={addAlpha(color, 0.4)}
    >
      <Flex alignItems="center">
        <Avatar
          src={`${API_BASE_URL}/avatar?u=${id}`}
          size="2xl"
          bg="transparent"
          showBorder={true}
          borderWidth="5px"
          borderColor={info.live ? color : "#808080"}
          as="a"
          href={`https://twitch.tv/${id}`}
        >
          {info.live && (
            <Tooltip hasArrow label="방송 중">
              <AvatarBadge boxSize="1em" bg="green.500" border="null" />
            </Tooltip>
          )}

          {!info.live && watch.in && (
            <Tooltip
              hasArrow
              label="채팅방에 접속 중"
              bg="gray.300"
              color="black"
            >
              <AvatarBadge boxSize="1em" bg="blue.500" border="null" />
            </Tooltip>
          )}
        </Avatar>
        <Box marginLeft={5}>
          <Heading as="a" href={`https://twitch.tv/${id}`}>
            {name}
          </Heading>
          <Text color="blackAlpha.700">{info.title}</Text>

          {info.live && <Text color="blackAlpha.700">{info.game}</Text>}
          {!info.live && bangon && <Bangon data={bangon} />}
        </Box>

        <Flex marginLeft="auto" flexDirection="column" alignItems="center">
          {info.live && (
            <>
              <Flex alignItems="center" marginLeft="auto">
                <Text fontSize="xl">{info.viewers.toLocaleString()}</Text>
                <Tooltip hasArrow label="시청자">
                  <ViewIcon h={6} w={6} marginLeft={1} />
                </Tooltip>
              </Flex>
              <Flex alignItems="center" marginLeft="auto">
                <Text fontSize="xl">{uptimeFormat(info.started_at)}</Text>
                <Tooltip hasArrow label="업타임">
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
              <Tooltip hasArrow label="최근 방송">
                <CalendarIcon h={6} w={6} marginLeft={1} />
              </Tooltip>
            </Flex>
          )}

          <Flex alignItems="center" marginLeft="auto">
            <Text fontSize="xl">
              {timeFormat(info.title_updated_at * 1000)}
            </Text>
            <Tooltip hasArrow label="방송 제목 변경">
              <EditIcon h={6} w={6} marginLeft={1} />
            </Tooltip>
          </Flex>

          <Flex alignItems="center" marginLeft="auto">
            <Text fontSize="xl">{timeFormat(wakzoo, true)}</Text>
            <Tooltip hasArrow label="왁물원 접속">
              <Image
                h={6}
                w={6}
                marginLeft={1}
                src={require("../assets/cafe.png")}
              />
            </Tooltip>
          </Flex>
        </Flex>
      </Flex>

      <Collapse in={open} unmountOnExit={true}>
        <Box marginTop={5}>
          <Divider borderBottomWidth={3} borderColor="blackAlpha.600" />
          {info.live && (
            <Box marginTop={5}>
              <iframe
                title="Twitch"
                src={`https://player.twitch.tv/?channel=${id}&parent=isedol-cctv.xyz&autoplay=false`}
                frameBorder={0}
                allowFullScreen={true}
                scrolling="no"
                width="730"
                height="410"
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
                시청 중
              </Text>
              <AvatarGroup>
                {watch.see.map((user: string) => (
                  <Avatar
                    size="lg"
                    bg="transparent"
                    src={`${API_BASE_URL}/avatar?u=${ITEMS[user].id}`}
                  />
                ))}
              </AvatarGroup>
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
            bg="white"
          >
            {chats && (
              <Flex justifyContent="center" margin={5} ref={ref}>
                <Spinner color="black" />
              </Flex>
            )}

            {chats.map((chat: IChat, idx: number) => (
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
