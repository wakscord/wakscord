import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import {
  Avatar,
  AvatarBadge,
  Box,
  Collapse,
  Divider,
  Flex,
  Heading,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";

import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EditIcon,
  Icon,
  TimeIcon,
  ViewIcon,
} from "@chakra-ui/icons";

import { IoCafe, IoLogoYoutube } from "react-icons/io5";

import "../css/Card.css";

import ReactGA from "react-ga4";
import Bangon from "./Bangon";
import Chat from "./Chat";
import Tooltip from "./Tooltip";

import { API_BASE_URL, ITEMS } from "../constants";
import {
  IBangonMember,
  IChat,
  IInfo,
  IUserData,
  IWakzoo,
  IWatchMember,
} from "../types";
import { addAlpha, timeFormat, uptimeFormat } from "../utils";

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
    const excludes = JSON.parse(
      localStorage.getItem("excludes") ?? "null"
    ) as string[];

    return excludes.join(" ");
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
          `${API_BASE_URL}/chats?m=${name}&s=${
            chats.length
          }&l=50&e=${getExcludes()}`
        );
        const data = await res.json();

        if (data[name].length === 0) {
          setChatEnd(true);
          return;
        }

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
      ReactGA.event({
        category: "open",
        action: name,
      });

      (async () => {
        const res = await fetch(
          `${API_BASE_URL}/chats?m=${name}&l=50&e=${getExcludes()}`
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
            src={`${API_BASE_URL}/avatar/${id}.png`}
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
            <Heading
              as="a"
              href={`https://twitch.tv/${id}`}
              target="_blank"
              fontFamily="Pretendard"
              ml={-1}
            >
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
            src={`${API_BASE_URL}/avatar/${id}.png`}
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
            <Heading
              as="a"
              href={`https://twitch.tv/${id}`}
              target="_blank"
              fontFamily="Pretendard"
            >
              {name}
            </Heading>
            <Text color="blackAlpha.700">{info.title}</Text>

            {info.live && <Text color="blackAlpha.700">{info.game}</Text>}
            {!info.live && bangon && <Bangon name={name} data={bangon} />}
          </Box>
        </Flex>

        <Flex
          minW="120px"
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

          <Flex alignItems="center" marginLeft="auto">
            <Tooltip label={info.youtube.title}>
              <Link
                href={`https://youtu.be/${info.youtube.id}`}
                fontSize="xl"
                target="_blank"
                _hover={{ textDecoration: "underline" }}
              >
                {timeFormat(new Date(info.youtube.uploaded_at).getTime())}
              </Link>
            </Tooltip>
            <Tooltip label="유튜브 업로드">
              <span>
                <Icon as={IoLogoYoutube} h={6} w={6} marginLeft={1} />
              </span>
            </Tooltip>
          </Flex>

          {window.localStorage.getItem("cafe") && (
            <Box ml="auto">
              <Wakzoo name={name} data={wakzoo}>
                <Flex alignItems="center" color="black">
                  <Text
                    as="p"
                    fontSize="xl"
                    _hover={{ textDecoration: "underline" }}
                  >
                    {timeFormat(wakzoo.time * 1000, true)}
                  </Text>
                  <Tooltip label="왁물원 접속">
                    <span>
                      <Icon as={IoCafe} h={6} w={6} marginLeft={1} />
                    </span>
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

          {window.localStorage.getItem("watch") && watch.see.length > 0 && (
            <Box marginTop={5}>
              <Text fontSize="1.25rem" fontWeight="bold">
                {name}님이 시청 중
              </Text>

              {watch.see.map((user: string) => (
                <Tooltip key={user} label={user}>
                  <Avatar
                    size="lg"
                    bg="transparent"
                    src={`${API_BASE_URL}/avatar/${ITEMS[user].id}.png`}
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
            {chatEnd ||
              (chats && (
                <Flex justifyContent="center" margin={5} ref={ref}>
                  <Spinner color="black" />
                </Flex>
              ))}

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
