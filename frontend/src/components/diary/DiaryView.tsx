import {
  Flex,
  HStack,
  Button,
  Text,
  Center,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { Diary } from "../../models/diary";
import { USERSPEC } from "../../types/user";
import { getCookie } from "typescript-cookie";

interface DiaryViewProps {
  focusUser: USERSPEC;
  diary?: Diary;
  isWrote: boolean;
  startWrite: () => void;
}
function DiaryView({ focusUser, diary, isWrote, startWrite }: DiaryViewProps) {
  const username = getCookie("username");
  return (
    <Flex
      bg={"white"}
      mx={12}
      px={8}
      direction="column"
      w="full"
      color={focusUser.textColor}
    >
      {/* NAME MATCH BUT NOT WRITE */}
      {username === focusUser.username && !isWrote && (
        <Center h="full">
          <VStack spacing={4}>
            <Heading>ยังไม่ได้เขียนของสัปดาห์นี้นะไอตูด 🫤</Heading>
            <Button
              colorScheme={focusUser.buttonScheme}
              size="lg"
              onClick={startWrite}
            >
              เขียนเลย
            </Button>
          </VStack>
        </Center>
      )}

      {/* NAME MATCH BUT ALREADY WROTE */}
      {username === focusUser.username && isWrote && (
        <>
          <HStack alignSelf={"flex-end"} pt={2}>
            <Text color="gray.500">Status: {diary?.status}</Text>
            {diary?.status == "draft" && (
              <Button
                colorScheme={focusUser.buttonScheme}
                size="sm"
                onClick={startWrite}
              >
                Continue Edit
              </Button>
            )}
          </HStack>
          <Flex direction="column" py={4}>
            <Text>{diary?.header}</Text>
            <Text>{diary?.context}</Text>
            <Text>{diary?.footer}</Text>
          </Flex>
        </>
      )}

      {/* OTHER PEOPLE, AND READY TO SHOW */}
      {username !== focusUser.username &&
        isWrote &&
        diary?.status == "confirm" && (
          <Flex direction="column" py={4}>
            <Text>{diary?.header}</Text>
            <Text>{diary?.context}</Text>
            <Text>{diary?.footer}</Text>
          </Flex>
        )}

      {/* OTHER PEOPLE, BUT NOT READY TO SHOW */}
      {username !== focusUser.username &&
        isWrote &&
        diary?.status != "confirm" && (
          <Center h="full">
            <VStack spacing={4}>
              <Heading>ยังไม่ถึงเวลาดูน้ะจ้ะ 😘</Heading>
            </VStack>
          </Center>
        )}

      {/* OTHER PEOPLE, BUT NOT WRITE YET */}
      {username !== focusUser.username && !isWrote && (
        <Center h="full">
          <VStack spacing={4}>
            <Heading>รออีกคนมาเขียนนะตูด 💩</Heading>
          </VStack>
        </Center>
      )}
    </Flex>
  );
}

export default DiaryView;
