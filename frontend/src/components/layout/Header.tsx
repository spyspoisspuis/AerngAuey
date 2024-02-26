import { Grid, GridItem, Heading } from "@chakra-ui/react";
import { Time } from "../time";
import { Userbar } from "../user";
import { USERSPEC } from "../../types/user";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  userSpec?: USERSPEC;
}

function Header({ userSpec }: HeaderProps) {
  const navigate = useNavigate();
  return (
    <Grid
      templateColumns="repeat(5,1fr)"
      w="full"
      h="8xs"
      bg={userSpec?.colorTheme || "blue.900"}
      alignItems={"center"}
      px={8}
      color={userSpec?.textColorOnTheme}
    >
      <GridItem colSpan={1}>
        <Time userSpec={userSpec} />
      </GridItem>
      <GridItem colSpan={3}>
        <Heading
          fontWeight={"bold"}
          textAlign="center"
          fontSize={"2xl"}
          onClick={() => navigate("/")}
          cursor={"pointer"}
        >
          AerngAuey Mainecoon
        </Heading>
      </GridItem>
      <GridItem colSpan={1} justifySelf={"flex-end"}>
        <Userbar userSpec={userSpec} />
      </GridItem>
    </Grid>
  );
}

export default Header;
