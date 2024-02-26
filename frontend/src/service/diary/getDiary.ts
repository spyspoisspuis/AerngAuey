import {instance} from "../axiosInstance";
import { CreateCustomError, ReturnError } from "../error";
import { ToastStatus } from "../../constant/toast";
import { ERR_Messages } from "../../constant/message";
import { GetDiaryResponse } from "../../models/diary";

export const getDiary = async (
  writer: string,
  week: string
): Promise<GetDiaryResponse> => {
  try {
    const response = await instance.get(`/diary/${writer}/${week}`);
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
