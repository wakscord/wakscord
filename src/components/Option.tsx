import { useState, useEffect } from "react";

import {
  Switch,
  Text,
  Flex,
  Box,
  Checkbox,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";

import { MultiSelect } from "react-multi-select-component";

import { AVAILABLE_ITEMS } from "../constants";

export interface Data {
  enabled: boolean;
  bangon: boolean;
  title: boolean;
  youtube: boolean;
  toto: boolean;
  cafe: boolean;
  users: string[];
}

interface IOptionProp {
  name: string;
  value: Data;
  onChange: (name: string, data: Data) => void;
}

export default function Option({ name, value, onChange }: IOptionProp) {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: value.enabled });
  const [bangon, setBangon] = useState<boolean>(value.bangon);
  const [title, setTitle] = useState<boolean>(value.title);
  const [youtube, setYoutube] = useState<boolean>(value.youtube);
  const [toto, setToto] = useState<boolean>(value.toto);
  const [cafe, setCafe] = useState<boolean>(value.cafe);
  const [selected, setSelected] = useState(
    value.users.map((x) => {
      return { label: x, value: x };
    })
  );

  useEffect(() => {
    onChange(name, {
      enabled: isOpen,
      bangon,
      title,
      youtube,
      toto,
      cafe,
      users: selected.map((x) => x.value),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, bangon, title, youtube, toto, cafe, selected]);

  return (
    <Box mb={10}>
      <Flex alignItems="center">
        <Switch size="lg" isChecked={isOpen} onChange={onToggle} />
        <Text ml={2} fontSize="1.3rem" fontWeight="bold">
          {name}
        </Text>
      </Flex>

      <Collapse in={isOpen} style={{ overflow: "initial" }}>
        <Box mt={3} borderRadius={10} borderWidth={2} padding="5px">
          <Flex flexDirection="column" mb={1}>
            <Checkbox
              defaultChecked={bangon}
              onChange={(e) => {
                setBangon(e.target.checked);
              }}
            >
              뱅온 알림
            </Checkbox>
            <Checkbox
              defaultChecked={title}
              onChange={(e) => {
                setTitle(e.target.checked);
              }}
            >
              방제 변경 알림
            </Checkbox>
            <Checkbox
              defaultChecked={youtube}
              onChange={(e) => {
                setYoutube(e.target.checked);
              }}
            >
              유튜브 업로드 알림
            </Checkbox>
            <Checkbox
              defaultChecked={toto}
              onChange={(e) => {
                setToto(e.target.checked);
              }}
            >
              토토 결과 알림
            </Checkbox>
            <Checkbox
              defaultChecked={cafe}
              onChange={(e) => {
                setCafe(e.target.checked);
              }}
            >
              왁물원 글 알림
            </Checkbox>
          </Flex>

          <MultiSelect
            options={AVAILABLE_ITEMS.map((x) => {
              return { label: x, value: x };
            })}
            value={selected}
            onChange={setSelected}
            labelledBy="Select"
            overrideStrings={{
              allItemsAreSelected: "모두 선택됨",
              noOptions: "결과 없음",
              search: "검색",
              selectAll: "전체 선택하기",
              selectAllFiltered: "전체 선택 (검색)",
              selectSomeItems: "선택하기",
            }}
          />
        </Box>
      </Collapse>
    </Box>
  );
}
