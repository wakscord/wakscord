import { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

const webhookRegex =
  /discord(?:app)?.com\/api\/webhooks\/([0-9]{17,20})\/([A-Za-z0-9.\-_]{60,68})/;

interface IDModalProp {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function DiscordModal({ isOpen, onClose }: IDModalProp) {
  const [input, setInput] = useState("");
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) =>
    setInput((e.target as HTMLInputElement).value);
  const isError = !webhookRegex.test(input);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>디스코드 웹후크 구독</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl isInvalid={isError}>
            <FormLabel htmlFor="email">디스코드 웹후크 URL</FormLabel>
            <Input
              id="email"
              type="email"
              value={input}
              onChange={handleInputChange}
            />
            {isError && (
              <FormErrorMessage>
                올바른 디스코드 웹후크 URL을 입력해주세요.
              </FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          {!isError && (
            <>
              <Button colorScheme="red" mr={3}>
                구독 취소
              </Button>
              <Button colorScheme="green">구독</Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
