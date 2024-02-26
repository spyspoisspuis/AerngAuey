import { SunIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";

function LoginHeader() {
  return (
    <Flex
      w="full"
      h="8xs"
      bg="blue.900"
      justify={"space-between"}
      align={"center"}
      px={4}
    >
      <SunIcon w={8} h={8} color="white" />
      <Text color="white">คิดถึงน้องเอยนะคะ</Text>
    </Flex>
  );
}

export default LoginHeader;
