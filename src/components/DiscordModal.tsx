import { useState, useEffect } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Divider,
  useToast,
  Collapse,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";

import { Icon, ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

import HowToMakeWebhook from "./HowToMakeWebhook";
import ClickText from "./ClickText";
import Option, { Data } from "./Option";
import { API_BASE_URL, ITEMS } from "../constants";

import ReactGA from "react-ga4";

const webhookRegex =
  /discord(?:app)?.com\/api\/webhooks\/([0-9]{17,20})\/([A-Za-z0-9.\-_]{60,68})/;

interface IDModalProp {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
  gosegu?: boolean;
}

export default function DiscordModal({
  isOpen,
  onClose,
  url = "",
  gosegu = false,
}: IDModalProp) {
  const [input, setInput] = useState("");
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) =>
    setInput((e.target as HTMLInputElement).value);
  const isError = !webhookRegex.test(input);
  const { isOpen: optionIsOpen, onToggle: optionOnToggle } = useDisclosure();
  const toast = useToast();

  const {
    isOpen: hIsOpen,
    onOpen: hOnOpen,
    onClose: hOnClose,
  } = useDisclosure();

  useEffect(() => {
    if (url) {
      setInput(url);
    }
  }, [url]);

  let initData;

  if (gosegu) {
    initData = {
      아이네: { enabled: true, bangon: false, title: false, users: ["고세구"] },
      징버거: { enabled: true, bangon: false, title: false, users: ["고세구"] },
      릴파: { enabled: true, bangon: false, title: false, users: ["고세구"] },
      주르르: { enabled: true, bangon: false, title: false, users: ["고세구"] },
      고세구: { enabled: true, bangon: true, title: true, users: ["고세구"] },
      비챤: { enabled: true, bangon: false, title: false, users: ["고세구"] },
      우왁굳: { enabled: true, bangon: false, title: false, users: ["고세구"] },
      천양: { enabled: true, bangon: false, title: false, users: ["고세구"] },
      뢴트게늄: {
        enabled: true,
        bangon: false,
        title: false,
        users: ["고세구"],
      },
    };
  } else {
    initData = {
      아이네: {
        enabled: true,
        bangon: true,
        title: true,
        users: Object.keys(ITEMS),
      },
      징버거: {
        enabled: true,
        bangon: true,
        title: true,
        users: Object.keys(ITEMS),
      },
      릴파: {
        enabled: true,
        bangon: true,
        title: true,
        users: Object.keys(ITEMS),
      },
      주르르: {
        enabled: true,
        bangon: true,
        title: true,
        users: Object.keys(ITEMS),
      },
      고세구: {
        enabled: true,
        bangon: true,
        title: true,
        users: Object.keys(ITEMS),
      },
      비챤: {
        enabled: true,
        bangon: true,
        title: true,
        users: Object.keys(ITEMS),
      },
      우왁굳: {
        enabled: true,
        bangon: true,
        title: true,
        users: Object.keys(ITEMS),
      },
      천양: { enabled: false, bangon: false, title: false, users: [] },
      뢴트게늄: { enabled: false, bangon: false, title: false, users: [] },
    };
  }

  const [data, setData] = useState<{
    [name: string]: Data;
  }>(initData);

  const handleChange = (name: string, _data: Data) => {
    setData({ ...data, [name]: _data });
  };

  const sub = async () => {
    if (gosegu) {
      ReactGA.event({
        category: "고세구",
        action: "구독",
      });
    } else {
      ReactGA.event({
        category: "일반",
        action: "구독",
      });
    }

    const _data: {
      url: string;
      subs: {
        [name: string]: string[];
      };
    } = { url: input, subs: {} };

    Object.entries(data).forEach(([name, data]) => {
      if (data.enabled) {
        _data.subs[name] = data.users;

        if (data.bangon) {
          _data.subs[name].push("뱅온");
        }

        if (data.title) {
          _data.subs[name].push("방제");
        }
      }
    });

    const res = await fetch(API_BASE_URL + "/subscribe", {
      method: "POST",
      body: JSON.stringify(_data),
    });

    if (res.status !== 204) {
      const json = await res.json();

      onClose();
      toast({
        title: "오류 발생",
        description: json.message,
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    } else {
      onClose();
      toast({
        title: "구독 완료",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const unsub = async () => {
    const res = await fetch(API_BASE_URL + "/unsubscribe", {
      method: "POST",
      body: JSON.stringify({ url: input }),
    });

    if (res.status !== 204) {
      const json = await res.json();

      onClose();

      toast({
        title: "오류 발생",
        description: json.message,
        status: "error",
        duration: 10000,
        isClosable: true,
      });
    } else {
      onClose();
      toast({
        title: "구독 취소 완료",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>디스코드 웹후크 구독</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl isInvalid={isError}>
            <FormLabel htmlFor="email" fontWeight="bold">
              디스코드 웹후크 URL
            </FormLabel>
            <Input
              id="email"
              type="email"
              value={input}
              onChange={handleInputChange}
            />
            {isError && (
              <FormErrorMessage flexDirection="column" alignItems="flex-start">
                <Text>올바른 디스코드 웹후크 URL을 입력해주세요.</Text>
                <ClickText
                  onClick={() => {
                    ReactGA.event({
                      category: "만드는법",
                      action: "만드는법",
                    });

                    hOnOpen();
                  }}
                >
                  웹후크 만드는 법
                </ClickText>
                <HowToMakeWebhook
                  onClose={hOnClose}
                  isOpen={hIsOpen}
                  onOpen={hOnOpen}
                />
              </FormErrorMessage>
            )}
          </FormControl>

          <Divider mt={5} mb={5} />

          <Flex alignItems="center" mb={3}>
            <Text fontWeight="bold" fontSize="1.2rem">
              설정
            </Text>
            <Icon
              as={optionIsOpen ? ChevronUpIcon : ChevronDownIcon}
              w={10}
              h={10}
              onClick={optionOnToggle}
            />
          </Flex>

          <Collapse in={optionIsOpen} style={{ overflow: "initial" }}>
            {Object.keys(ITEMS).map((x, idx) => (
              <Option
                key={idx}
                name={x}
                value={data[x]}
                onChange={handleChange}
              />
            ))}
          </Collapse>
        </ModalBody>

        <ModalFooter>
          {!isError && (
            <>
              <Button colorScheme="red" mr={3} onClick={unsub}>
                구독 취소
              </Button>
              <Button colorScheme="green" onClick={sub}>
                구독
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
