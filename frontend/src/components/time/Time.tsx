import moment from "moment-timezone";
import { useState, useEffect } from "react";
import { SPYSPEC } from "../../constant/userspec";
import { fetchWorldTime } from "../../service/time";
import { MessageToast } from "../toast";
import { Box, Center, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { USERSPEC } from "../../types/user";

interface TimeProps {
    userSpec?: USERSPEC;
}

function Time({ userSpec }: TimeProps) {
    const { addToast } = MessageToast();
    const [selectTimeZone, setSelectTimeZone] = useState("");
    const [optionTimeZone, setOptionTimeZone] = useState("");

    useEffect(() => {
        const getTime = async (timezone: string) => {
            try {
                const data = await fetchWorldTime(timezone);
                const dateTimeString = data.datetime;
                const dateTimeObject = moment(dateTimeString).tz(timezone);
                const time = dateTimeObject.format("HH:mm");
                const dayOfWeek = dateTimeObject.format("ddd");
                return ` ${timezone.split('/')[1]} ${dayOfWeek} ${time}`;
            } catch (error) {
                addToast({
                    description: "Something went wrong, Contact Handsome wolf",
                    status: "error",
                });
            }
        };

        const fetchDateTime = async () => {
            try {
                const bkkDisplay = await getTime("Asia/Bangkok");
                const bneDisplay = await getTime("Australia/Brisbane");

                if (userSpec?.username === SPYSPEC.username) {
                    setSelectTimeZone(bkkDisplay ?? "");
                    setOptionTimeZone(bneDisplay ?? "");
                } else {
                    setSelectTimeZone(bneDisplay ?? "");
                    setOptionTimeZone(bkkDisplay ?? "");
                }
            } catch (error) {
                addToast({
                    description: "Something went wrong, Contact Handsome wolf",
                    status: "error",
                });
            }
        };

        fetchDateTime();
        const interval = setInterval(fetchDateTime, 50000);
        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box>
            <Menu variant={userSpec?.variantsName}>
                <MenuButton>
                    <Center gap={2}>
                        {selectTimeZone}
                        <ChevronDownIcon />
                    </Center>
                </MenuButton>
                <MenuList>
                    <MenuItem
                        color="black"
                        onClick={() => {
                            setSelectTimeZone(optionTimeZone);
                            setOptionTimeZone(selectTimeZone);
                        }}
                    >
                        {optionTimeZone}
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    );
}

export default Time;