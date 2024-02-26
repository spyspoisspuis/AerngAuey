import {instance} from "../axiosInstance";
import { CreateCustomError, ReturnError } from "../error";
import { LoginDTO } from "../../types/user";
import { ToastStatus } from "../../constant/toast";
import { ERR_Messages } from "../../constant/message";
/**
 * Authenticates a user by sending a login request to the server.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @return {Promise<any>} - A promise that resolves with the response data from the server.
 */
export const login = async (loginDTO: LoginDTO) => {
  try {
    const response = await instance.post(`/login`, {
      username: loginDTO.username,
      password: loginDTO.password,
    });
    return response.data;
  } catch (error: unknown) {
    const requestError = CreateCustomError(error);
    let returnError: ReturnError;
    if (requestError.status == 400 || requestError.status == 401) {
      returnError = {
        message: ERR_Messages.INVALID_USERNAME_OR_PASSWORD,
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
