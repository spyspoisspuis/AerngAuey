import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  Center,
  Avatar,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { USERSPEC } from "../../types/user";
import { removeCookie } from "typescript-cookie";
import { useNavigate } from "react-router-dom";
interface UserbarProps {
  userSpec?: USERSPEC;
}

function Userbar({ userSpec }: UserbarProps) {
    const navigate = useNavigate();
  return (
    <Menu variant={userSpec?.variantsName}>
      <MenuButton>
        <Center gap={2}>
          <Avatar size="sm" />
          {userSpec?.username}
          <ChevronDownIcon />
        </Center>
      </MenuButton>
      <MenuList>
        <MenuItem color="black" onClick={()=> {
            removeCookie("token");
            removeCookie("username");
            navigate("/");
        }}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default Userbar;
