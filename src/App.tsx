import { Box, Heading, Button, Flex, useDisclosure } from "@chakra-ui/react";
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
    <div
      className="App"
      style={{ backgroundColor: "#EDEDED", padding: "3rem" }}
    >
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
      </div>
    </div>
  );
}
