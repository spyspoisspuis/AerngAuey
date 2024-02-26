import { AuthenForm } from "../components/auth";
import { login } from "../service/user";
import { LoginDTO } from "../types/user";
import { ReturnError } from "../service/error";
import { MessageToast } from "../components/toast";
import { setCookie } from "typescript-cookie";
import { ToastStatus } from "../constant/toast";
import { Box, Center, Grid } from "@chakra-ui/react";
import { Footer } from "../components/layout";
import LoginHeader from "../components/layout/LoginHeader";
import { useNavigate } from "react-router-dom";
function LoginPage() {
    const navigate = useNavigate();
  const { addToast } = MessageToast();
  const handleLogin = async (username: string, password: string) => {
    const loginDTO: LoginDTO = {
      username: username,
      password: password,
    };

    await login(loginDTO)
      .then((response) => {
        addToast({
          description: "Login successfully",
          status: ToastStatus.SUCCESS,
        });
        setCookie("token", response.token, { expires: 7 });
        setCookie("username", response.username, { expires: 7 });
        navigate("/");
      })
      .catch((error: ReturnError) => {
        addToast({
          description: error.message,
          status: error.toastStatus,
        });
      });
  };

  return (
    <Grid templateRows="auto 1fr auto" minHeight="100vh">
      <Box as="header">
        <LoginHeader />
      </Box>
      <Box as="main">
        <Center h="full">
          <AuthenForm submit={handleLogin} />
        </Center>
      </Box>
      <Box as="footer">
        <Footer />
      </Box>
    </Grid>
  );
}

export default LoginPage;
