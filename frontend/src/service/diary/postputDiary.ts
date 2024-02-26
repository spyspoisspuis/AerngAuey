import { instance } from "../axiosInstance";
import { CreateCustomError, ReturnError } from "../error";
import { ToastStatus } from "../../constant/toast";
import { ERR_Messages } from "../../constant/message";
import { Diary } from "../../models/diary";

export const postDiary = async (
  diary: Diary,
) => {
  try {
    const response = await instance.post(`/diary`,{
      writer: diary.writer,
      week: diary.week,
      header: diary.header,
      context: diary.context,
      footer: diary.footer,
      status: diary.status,
    });
    return response.data;
  } catch (error: unknown) {
    const requestError = CreateCustomError(error);
    let returnError: ReturnError;
    if (requestError.status == 400 || requestError.status == 401) {
      returnError = {
        message: ERR_Messages.BAD_REQUEST,
        status: requestError.status,
        toastStatus: ToastStatus.ERROR,
      };
    } else {
      returnError = {
        message: ERR_Messages.SYSTEM_ERROR,
        status: 500,
        toastStatus: ToastStatus.ERROR,
      };
    }
    throw returnError;
  }
};

export const putDiary = async (
  diary: Diary,
) => {
  try {
    const response = await instance.put(`/diary`,{
      id: diary.id,
      writer: diary.writer,
      week: diary.week,
      header: diary.header,
      context: diary.context,
      footer: diary.footer,
      status: diary.status,
    });
    return response.data;
  } catch (error: unknown) {
    const requestError = CreateCustomError(error);
    let returnError: ReturnError;
    if (requestError.status == 400 || requestError.status == 401) {
      returnError = {
        message: ERR_Messages.BAD_REQUEST,
        status: requestError.status,
        toastStatus: ToastStatus.ERROR,
      };
    } else {
      returnError = {
        message: ERR_Messages.SYSTEM_ERROR,
        status: 500,
        toastStatus: ToastStatus.ERROR,
      };
    }
    throw returnError;
  }
}
