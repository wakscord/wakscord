import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";

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
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
