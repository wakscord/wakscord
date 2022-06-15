import {
  Box,
  Image,
  Button,
  Flex,
  useDisclosure,
  Divider,
  Text,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./css/App.css";

import ReactGA from "react-ga4";
import Card from "./components/Card";
import ClickText from "./components/ClickText";
import DiscordModal from "./components/DiscordModal";
import ChatConfig from "./components/ChatConfig";
import { API_BASE_URL, ITEMS } from "./constants";
import { Data } from "./types";

export default function App() {
  const [data, setData] = useState<Data>({
    info: {},
    wakzoo: {},
    bangon: {
      info: {
        idx: "",
        date: "",
        comment: [],
      },
      members: {},
    },
    watch: {},
  });

  const [count, setCount] = useState(0);
  const [url, setUrl] = useState("");
  const {
    isOpen: dIsOpen,
    onOpen: dOnOpen,
    onClose: dOnClose,
  } = useDisclosure();

  const {
    isOpen: gdIsOpen,
    onOpen: gdOnOpen,
    onClose: gdOnClose,
  } = useDisclosure();

  const {
    isOpen: cIsOpen,
    onOpen: cOnOpen,
    onClose: cOnClose,
  } = useDisclosure();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("cafe") !== null) {
      window.localStorage.setItem("cafe", "true");

      ReactGA.event({
        category: "cafe",
        action: "cafe",
      });
    }

    if (params.get("watch") !== null) {
      window.localStorage.setItem("watch", "true");

      ReactGA.event({
        category: "watch",
        action: "watch",
      });
    }

    if (params.get("make")) {
      setUrl(`https://discord.com/api/webhooks/${params.get("make")}`);
    }

    (async () => {
      const res = await fetch(API_BASE_URL + "/data");
      const json = await res.json();

      setData(json);
    })();

    (async () => {
      const res = await fetch(API_BASE_URL + "/status");
      const json = await res.json();

      setCount(json.count);
    })();
  }, []);

  useEffect(() => {
    if (url !== "") {
      console.log(url);
      dOnOpen();
    }
  }, [url, dOnOpen]);

  return (
    <div className="App">
      <div className="content">
        <Flex justifyContent="center" alignItems="center">
          <Box margin={10} mb={20} textAlign="center" maxW="600px">
            <Image src="/logo.png" alt="왁스코드" display="inline" w="sm" />

            <Button onClick={dOnOpen} colorScheme="blue" mt={-10}>
              디스코드로 알림 받아보기
            </Button>

            <ClickText onClick={gdOnOpen}>
              세구님이 장기 휴뱅 선언을 했어요. 가끔 채팅창에 출몰하는 세구님
              만나보기
            </ClickText>

            <DiscordModal isOpen={dIsOpen} onClose={dOnClose} url={url} />
            <DiscordModal
              isOpen={gdIsOpen}
              onClose={gdOnClose}
              url={url}
              gosegu
            />
          </Box>
        </Flex>

        {Object.entries(ITEMS).map((item, index) => (
          <Card
            key={index}
            name={item[0]}
            data={item[1]}
            info={data.info[item[0]]}
            watch={data.watch[item[0]]}
            wakzoo={data.wakzoo[item[0]]}
            bangon={data.bangon.members[item[0]]}
          />
        ))}

        <Divider />
      </div>

      <div className="footer">
        <Flex
          bgColor="#c5c5c5"
          padding={10}
          flexDirection="column"
          alignItems="center"
          gap={2}
        >
          <Text mb={3}>{count}개의 웹후크가 정보를 받아보는 중</Text>
          <ClickText onClick={cOnOpen}>채팅 설정</ClickText>
          <ChatConfig isOpen={cIsOpen} onOpen={cOnOpen} onClose={cOnClose} />

          <Link
            href={`https://cafe.naver.com/steamindiegame/${data.bangon.info.idx}`}
            color="#146eff"
            target="_blank"
          >
            [{data.bangon.info.date}] 이세돌 뱅온정보
          </Link>
          <Link
            href="https://github.com/minibox24/wakscord"
            color="#146eff"
            target="_blank"
          >
            깃허브
          </Link>
        </Flex>
      </div>
    </div>
  );
}
