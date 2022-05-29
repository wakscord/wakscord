import {
  Box,
  Heading,
  Button,
  Flex,
  useDisclosure,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./css/App.css";

import Card from "./components/Card";
import DiscordModal from "./components/DiscordModal";
import { API_BASE_URL, ITEMS } from "./constants";

export default function App() {
  const [info, setInfo] = useState<any>({});
  const [watch, setWatch] = useState<any>({});
  const [wakzoo, setWakzoo] = useState<any>({});
  const [bangon, setBangon] = useState<any>({ members: {} });
  const [loaded, setLoaded] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    (async () => {
      const res = await fetch(API_BASE_URL + "/data");
      const data = await res.json();

      setInfo(data.info);
      setWatch(data.watch);
      setWakzoo(data.wakzoo);
      setBangon(data.bangon);

      setLoaded(true);
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
            <Button onClick={onOpen}>디스코드로 알림 받아보기</Button>
            <DiscordModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
          </Flex>
        </Box>

        {Object.entries(ITEMS).map((item, index) => (
          <Card
            key={index}
            name={item[0]}
            data={item[1]}
            info={info[item[0]]}
            watch={watch[item[0]]}
            wakzoo={new Date(wakzoo[item[0]] * 1000)}
            bangon={bangon.members[item[0]]}
          />
        ))}
      </div>
    </div>
  );
}
