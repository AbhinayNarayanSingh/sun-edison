import axios from "axios";
import { fileFetchAction } from "./FileFetchState";
import { sharedFileFetchAction } from "./SharedFileFetchState";

// ! CONSTANTS

const GIVE_ACCESS_INITIATE = "GIVE_ACCESS_INITIATE";
const GIVE_ACCESS_SUCCESS = "GIVE_ACCESS_SUCCESS";
const GIVE_ACCESS_FAIL = "GIVE_ACCESS_FAIL";

//  ! REDUCER

export const giveAccessReducer = (state = [], action) => {
  switch (action.type) {
    case GIVE_ACCESS_INITIATE:
      return { loding: true, giveAccess: [] };
    case GIVE_ACCESS_SUCCESS:
      return { loding: false, giveAccess: action.payload };
    case GIVE_ACCESS_FAIL:
      return { loding: false, error: action.payload };

    default:
      return state;
  }
};

//  ! ACTIONS

export const giveAccessAction =
  (pk, accessTo, document) => async (dispatch) => {
    try {
      dispatch({ type: GIVE_ACCESS_INITIATE });

      let fd = new FormData();
      fd.append("accessBy", pk);
      fd.append("accessTo", accessTo);
      fd.append("document", document);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `http://127.0.0.1:8000/access-file/create/`,
        fd,
        config
      );

      dispatch(fileFetchAction(pk));
      dispatch(sharedFileFetchAction(pk));
      dispatch({ type: GIVE_ACCESS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GIVE_ACCESS_FAIL, payload: error.message });
    }
  };
