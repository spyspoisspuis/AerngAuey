import { Box, Grid } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Header, Footer } from "../components/layout";
import { getCookie } from "typescript-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageToast } from "../components/toast";
import { AUEYSPEC, SPYSPEC } from "../constant/userspec";
interface BasePageProps {
  children: ReactNode;
}

export const BasePage: React.FC<BasePageProps> = ({ children }) => {
  const navigate = useNavigate();
  const username = getCookie("username");
  const userSpec = username == SPYSPEC.username ? SPYSPEC : AUEYSPEC;
  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      const { addToast } = MessageToast();
      addToast({
        description: "Please login",
        status: "warning",
      });
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid templateRows="auto 1fr auto" minHeight="100vh" bg={userSpec.textBackground}>
      <Box as="header">
        <Header userSpec={userSpec} />
      </Box>
      <Box as="main">{children}</Box>
      <Box as="footer">
        <Footer />
      </Box>
    </Grid>
  );
};
