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

import Card from "./components/Card";
import DiscordModal from "./components/DiscordModal";
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (window.location.search === "?cafe") {
      window.localStorage.setItem("cafe", "true");
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

  return (
    <div className="App">
      <div className="content">
        <Box margin={10} mt={-10} textAlign="center">
          <Image src="/logo.png" alt="왁스코드" display="inline" w="sm" />
          <Button onClick={onOpen} colorScheme="blue" mt={-10}>
            디스코드로 알림 받아보기
          </Button>
          <DiscordModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </Box>

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
          <Text>{count}개의 웹후크가 정보를 받아보는 중</Text>
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
