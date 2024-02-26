import { Center, Text, Spinner, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { getCookie } from "typescript-cookie";
import { useNavigate } from "react-router-dom";
function Wrapper() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [navigate]);
  
  return (
    <Center minH="100svh">
      <VStack>
        <Text fontSize="3xl">Checking your session...</Text>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </VStack>
    </Center>
  );
}

export default Wrapper;
