import {
  Box,
  Heading,
  Button,
  Flex,
  useDisclosure,
  Divider,
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

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    (async () => {
      const res = await fetch(API_BASE_URL + "/data");
      const json = await res.json();

      setData(json);
    })();
  }, []);

  return (
    <div className="App">
      <div className="content">
        <Box margin={10}>
          <Heading as="h1" size="4xl" textAlign="center">
            이세돌 CCTV
          </Heading>
          <Flex justifyContent="center" marginTop={5}>
            <Button onClick={onOpen} colorScheme="blue">
              디스코드로 알림 받아보기
            </Button>
            <DiscordModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
          </Flex>
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
        <Flex bgColor="#c5c5c5" padding={10} flexDirection="column" gap={2}>
          <Link
            href={`https://cafe.naver.com/steamindiegame/${data.bangon.info.idx}`}
            textAlign="center"
            color="#146eff"
          >
            [{data.bangon.info.date}] 이세돌 뱅온정보
          </Link>
          <Link
            href="https://github.com/minibox24/isedol-cctv"
            textAlign="center"
            color="#146eff"
          >
            깃허브
          </Link>
        </Flex>
      </div>
    </div>
  );
}
