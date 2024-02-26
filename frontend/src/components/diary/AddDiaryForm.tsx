import {
  VStack,
  InputGroup,
  InputLeftAddon,
  Input,
  Textarea,
  Select,
  Button,
} from "@chakra-ui/react";
import { InputFieldAndLabel } from ".";
import { Diary } from "../../models/diary";
import { SPYSPEC, AUEYSPEC } from "../../constant/userspec";

interface AddDiaryFormProps {
  diary: Diary;
  username: string;
  week: string;
  changeWeek: (week: string) => void;
  changeHeader: (header: string) => void;
  changeContext: (context: string) => void;
  changeFooter: (footer: string) => void;
  changeStatus: (status: string) => void;
  submit: () => void;
}

function AddDiaryForm({
  diary,
  username,
  week,
  changeWeek,
  changeHeader,
  changeContext,
  changeFooter,
  changeStatus,
  submit,
}: AddDiaryFormProps) {
  const userSpec = username == SPYSPEC.username ? SPYSPEC : AUEYSPEC;
  return (
    <VStack w="50%">
      <InputGroup>
        <InputLeftAddon>Writer</InputLeftAddon>
        <Input
          type="text"
          placeholder="Writer"
          defaultValue={username}
          disabled
        />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>Week</InputLeftAddon>
        <Input
          type="week"
          placeholder="Week"
          defaultValue={week}
          onChange={(e) => changeWeek(e.target.value)}
        />
      </InputGroup>
      <InputFieldAndLabel label="Header">
        <Textarea
          placeholder="Header"
          defaultValue={diary?.header}
          onChange={(e) => changeHeader(e.target.value)}
        />
      </InputFieldAndLabel>
      <InputFieldAndLabel label="Context">
        <Textarea
          placeholder="Context"
          defaultValue={diary?.context}
          onChange={(e) => changeContext(e.target.value)}
        />
      </InputFieldAndLabel>
      <InputFieldAndLabel label="Footer">
        <Textarea
          placeholder="Footer"
          defaultValue={diary?.footer}
          onChange={(e) => changeFooter(e.target.value)}
        />
      </InputFieldAndLabel>
      <InputFieldAndLabel label="Status">
        <Select
          defaultValue={diary?.status}
          onChange={(e) => changeStatus(e.target.value)}
        >
          <option value="draft">draft</option>
          <option value="confirm">confirm</option>
        </Select>
      </InputFieldAndLabel>
      <Button
        colorScheme={userSpec.buttonScheme}
        variant="solid"
        onClick={submit}
      >
        Submit
      </Button>
    </VStack>
  );
}

export default AddDiaryForm;
