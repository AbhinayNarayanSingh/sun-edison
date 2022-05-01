import axios from "axios";

// ! CONSTANTS

const USER_FETCH_INITIATE = "USER_FETCH_INITIATE";
const USER_FETCH_SUCCESS = "USER_FETCH_SUCCESS";
const USER_FETCH_FAIL = "USER_FETCH_FAIL";

//  ! REDUCER

export const userFetchReducer = (state = [], action) => {
  switch (action.type) {
    case USER_FETCH_INITIATE:
      return { loding: true, allUser: [] };
    case USER_FETCH_SUCCESS:
      return { loding: false, allUser: action.payload };
    case USER_FETCH_FAIL:
      return { loding: false, error: action.payload };

    default:
      return state;
  }
};

//  ! ACTIONS

export const userFetchAction = (pk) => async (dispatch) => {
  try {
    dispatch({ type: USER_FETCH_INITIATE });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `http://127.0.0.1:8000/get/all/user/${pk}`,
      config
    );

    dispatch({ type: USER_FETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_FETCH_FAIL, payload: error.message });
  }
};
