import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Code,
  Flex,
  Image,
} from "@chakra-ui/react";

import Link from "./Link";

interface IHowToMakeWebhookProp {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function HowToMakeWebhook({
  isOpen,
  onClose,
}: IHowToMakeWebhookProp) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent maxW="5xl">
        <ModalHeader>웹후크 만드는 법</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <video
            width="100%"
            height="100%"
            controls
            src="/how_to_make_webhook.mp4"
          ></video>
          <Text mt={3}>
            모바일은 브라우저에서 디스코드 로그인 후 위 방법을 똑같이
            따라해주세요.
          </Text>

          <Text>
            또는{" "}
            <Link href="https://discord.com/api/oauth2/authorize?client_id=520830713696878592&permissions=1100085521472&scope=bot%20applications.commands">
              이 봇
            </Link>
            을 초대 후 <Code>ㅁ왁스코드</Code> 커맨드를 사용해서 쉽게 웹후크를
            만드세요
          </Text>
          <Flex mt={5} gap={3} maxW="sm">
            <Image src="/minibot1.png" alignSelf="center" />
            <Image src="/minibot2.png" alignSelf="center" />
          </Flex>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
