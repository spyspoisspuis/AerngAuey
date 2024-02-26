import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Center,
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface AuthenFormProps {
  submit: (username: string, password: string) => void;
}

function AuthenForm({ submit }: AuthenFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Box w={["2xs", "md"]} pb={12}>
      <Box rounded={"lg"} bg={"white"} boxShadow={"xl"} p={8} w="full">
        <Stack spacing={2} w="full">
          <FormControl id="username" isRequired>
            <FormLabel fontWeight={"light"}>username</FormLabel>
            <Input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              variant={"authen_field"}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel fontWeight={"light"}>password</FormLabel>
            <InputGroup>
              <Input
                pr="3rem"
                type={show ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                variant={"authen_field"}
              />

              <InputRightElement width="3rem">
                <IconButton
                  size="sm"
                  h="1.75rem"
                  aria-label="View/Hide password"
                  onClick={handleClick}
                  icon={show ? <ViewIcon /> : <ViewOffIcon />}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Center>
            <Button variant="blue" onClick={() => submit(username, password)}>
              login
            </Button>
          </Center>
        </Stack>
      </Box>
    </Box>
  );
}

export default AuthenForm;
