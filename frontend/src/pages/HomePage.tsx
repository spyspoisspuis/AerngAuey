import { Center, Flex, Grid, GridItem, Input } from "@chakra-ui/react";
import { BasePage } from "./BasePage";
import { DiaryView, UserTabs } from "../components/diary";
import moment from "moment-timezone";
import { getCookie } from "typescript-cookie";
import { AUEYSPEC, SPYSPEC } from "../constant/userspec";
import { useState } from "react";
import { Diary } from "../models/diary";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getDiary } from "../service/diary";
import { MessageToast } from "../components/toast";
function HomePage() {
  const [diary, setdiary] = useState<Diary>();
  const [isFoundDiary, setisFoundDiary] = useState(false);

  const {addToast} = MessageToast();
  const navigate = useNavigate();
  const username = getCookie("username");
  const [focusUsername, setFocusUsername] = useState(username);
  const focusUser = focusUsername === AUEYSPEC.username ? AUEYSPEC : SPYSPEC;
  const currentWeek = moment().tz("Asia/Bangkok").format("YYYY-[W]WW");
  const [week, setWeek] = useState(currentWeek);

  const refetchDiary = async (uname: string, cweek: string) => {
    await getDiary(uname, cweek)
      .then((res) => {
        setdiary(res.diary);
        setisFoundDiary(res.isFounded);
      })
      .catch((error) => {
        addToast({
          description: error.message,
          status: error.toastStatus,
        });
      });
  }

  const changeFocusUser = (uname: string) => {
    setFocusUsername(uname);
    refetchDiary(uname,week);
  };

  const changeWeek = (cweek: string) => {
    setWeek(cweek);
    refetchDiary(focusUsername || username || "" ,cweek);
  };

  const startWrite = () => {
    navigate(`/write/${week}`);
  };

  useEffect(() => {
    const getDiaryFromBackend = async () => {
      await getDiary(username || "", week)
        .then((res) => {
          setdiary(res.diary);
          setisFoundDiary(res.isFounded);
        })
        .catch((error) => {
          addToast({
            description: error.message,
            status: error.toastStatus,
          });
        });
    };

    getDiaryFromBackend();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <BasePage>
      <Grid templateRows="1fr 10fr" h="full" p={8}>
        <Grid templateColumns={"repeat(5,1fr)"} w="full">
          <GridItem colStart={2} colEnd={5}>
            <Center>
              <UserTabs
                username={focusUsername || ""}
                changeFocusUser={changeFocusUser}
              />
            </Center>
          </GridItem>
          <GridItem colStart={5}>
            <Input
              type="week"
              defaultValue={currentWeek}
              onChange={(e) => changeWeek(e.target.value)}
            />
          </GridItem>
        </Grid>

        <Flex w="full" h="full">
          <DiaryView
            focusUser={focusUser}
            diary={diary}
            isWrote={isFoundDiary}
            startWrite={startWrite}
          /> 
        </Flex>
      </Grid>
    </BasePage>
  );
}

export default HomePage;
