import { Tabs, TabList, Tab, Box } from "@chakra-ui/react";
import { SPYSPEC, AUEYSPEC } from "../../constant/userspec";
const tabs = [
  {
    name: SPYSPEC.username,
    color: SPYSPEC.colorTheme,
  },
  {
    name: AUEYSPEC.username,
    color: AUEYSPEC.colorTheme,
  },
];

interface UserTabsProps {
  username: string;
  changeFocusUser: (username: string) => void;
}
function UserTabs({ username, changeFocusUser }: UserTabsProps) {
  const defaultIndex = tabs.findIndex((tab) => tab.name === username);
  
  const handleChangeFocusUser = (index: number) => {
    changeFocusUser(tabs[index].name);
  };

  return (
    <Box w="auto">
      <Tabs
        variant="soft-rounded"
        defaultIndex={defaultIndex}
        onChange={(index) => handleChangeFocusUser(index)}
      >
        <TabList>
          {tabs.map((tab) => (
            <Tab key={tab.name} _selected={{ color: "white", bg: tab.color }}>
              {tab.name}
            </Tab>
          ))}
        </TabList>
      </Tabs>
    </Box>
  );
}

export default UserTabs;
