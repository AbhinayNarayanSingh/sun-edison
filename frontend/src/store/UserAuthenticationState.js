import axios from "axios";
import { userFetchAction } from "./AllUser";
import { fileFetchAction } from "./FileFetchState";
import { sharedFileFetchAction } from "./SharedFileFetchState";

// ! CONSTANTS

const USER_AUTHENTICATION_INITIATE = "USER_AUTHENTICATION_INITIATE";
const USER_AUTHENTICATION_SUCCESS = "USER_AUTHENTICATION_SUCCESS";
const USER_AUTHENTICATION_FAIL = "USER_AUTHENTICATION_FAIL";

const USER_LOGOUT = "USER_LOGOUT";

//  ! REDUCER

export const userAuthenticationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_AUTHENTICATION_INITIATE:
      return { loding: true, userInfo: {} };
    case USER_AUTHENTICATION_SUCCESS:
      return { loding: false, userInfo: action.payload };
    case USER_AUTHENTICATION_FAIL:
      return { loding: false, error: action.payload };
    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

//  ! ACTIONS

export const userSignUpAction = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_AUTHENTICATION_INITIATE });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = {
      name,
      email,
      password,
    };

    const { data } = await axios.post(
      "http://localhost:8000/api/user/register/",
      JSON.stringify(body),
      config
    );
    localStorage.setItem("user", JSON.stringify(data));

    dispatch(fileFetchAction(data["_id"]));
    dispatch(sharedFileFetchAction(data["_id"]));
    dispatch(userFetchAction(data["_id"]));
    dispatch({ type: USER_AUTHENTICATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_AUTHENTICATION_FAIL, payload: error.message });
  }
};

export const userAuthenticationAction =
  (email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_AUTHENTICATION_INITIATE });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        email,
        password,
      };

      const { data } = await axios.post(
        "http://localhost:8000/api/user/login/",
        JSON.stringify(body),
        config
      );
      localStorage.setItem("user", JSON.stringify(data));

      dispatch(fileFetchAction(data["_id"]));
      dispatch(sharedFileFetchAction(data["_id"]));
      dispatch(userFetchAction(data["_id"]));
      dispatch({ type: USER_AUTHENTICATION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: USER_AUTHENTICATION_FAIL, payload: error.message });
    }
  };

export const userLogoutAction = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch({
    type: USER_LOGOUT,
  });
};
