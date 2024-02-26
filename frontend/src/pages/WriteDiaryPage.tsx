import { useParams } from "react-router-dom";
import { BasePage } from "./BasePage";
import { Box, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getCookie } from "typescript-cookie";
import { AddDiaryForm } from "../components/diary";
import { MessageToast } from "../components/toast";
import { Diary, emptyDiary } from "../models/diary";
import { getDiary, postDiary, putDiary } from "../service/diary";
import { useNavigate } from "react-router-dom";

function WriteDiaryPage() {
  const navigate = useNavigate();
  const { addToast } = MessageToast();
  const username = getCookie("username");
  const { week } = useParams();
  const [selectedWeek, setSelectedWeek] = useState(week || "");
  const [diary, setDiary] = useState<Diary>(emptyDiary);
  const [isFounded, setIsFounded] = useState(false);

  // Function to update the diary based on the selected week
  const changeWeek = async (cweek: string) => {
    setDiary(emptyDiary);
    setIsFounded(false);
    setSelectedWeek(cweek);
    const res = await getDiary(username || "", cweek).catch((error) => {
      addToast({
        description: error.message,
        status: error.toastStatus,
      });
    });

    if (res) {
      const tempDiary = res.isFounded
        ? res.diary
        : {
            ...emptyDiary,
            writer: username || "",
            week: cweek || "",
            status: "draft",
          };
      setDiary(tempDiary);
      setIsFounded(res.isFounded);
    }
  };

  // Functions to update the diary fields
  const changeHeader = (header: string) => setDiary({ ...diary, header });
  const changeContext = (context: string) => setDiary({ ...diary, context });
  const changeFooter = (footer: string) => setDiary({ ...diary, footer });
  const changeStatus = (status: string) => setDiary({ ...diary, status });

  // Function to submit the diary
  const submit = async () => {
    const action = isFounded ? putDiary : postDiary;
    await action(diary)
      .then(() => {
        addToast({
          description: isFounded
            ? "Update successfully"
            : "Create successfully",
          status: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        addToast({
          description: error.message,
          status: error.toastStatus,
        });
      });
  };

  // Effect to get the diary when the component mounts
  useEffect(() => {
    changeWeek(week || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BasePage>
      <Box w="full" h="full" p={16}>
        <Flex
          w="full"
          h="full"
          rounded={"lg"}
          bg={"white"}
          boxShadow={"xl"}
          justify={"center"}
          py={8}
        >
          <AddDiaryForm
            diary={diary}
            username={username || ""}
            week={selectedWeek}
            changeWeek={changeWeek}
            changeHeader={changeHeader}
            changeContext={changeContext}
            changeFooter={changeFooter}
            changeStatus={changeStatus}
            submit={submit}
          />
        </Flex>
      </Box>
    </BasePage>
  );
}

export default WriteDiaryPage;