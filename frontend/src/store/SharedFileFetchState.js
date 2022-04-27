import axios from "axios";

// ! CONSTANTS

const SHARED_FILE_FETCH_INITIATE = "SHARED_FILE_FETCH_INITIATE";
const SHARED_FILE_FETCH_SUCCESS = "SHARED_FILE_FETCH_SUCCESS";
const SHARED_FILE_FETCH_FAIL = "SHARED_FILE_FETCH_FAIL";

//  ! REDUCER

export const sharedFileFetchReducer = (state = [], action) => {
  switch (action.type) {
    case SHARED_FILE_FETCH_INITIATE:
      return { loding: true, shared: [] };
    case SHARED_FILE_FETCH_SUCCESS:
      return { loding: false, shared: action.payload };
    case SHARED_FILE_FETCH_FAIL:
      return { loding: false, error: action.payload };

    default:
      return state;
  }
};

//  ! ACTIONS

export const sharedFileFetchAction = (pk) => async (dispatch) => {
  try {
    dispatch({ type: SHARED_FILE_FETCH_INITIATE });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `http://127.0.0.1:8000/access-file/${pk}`,
      config
    );

    dispatch({ type: SHARED_FILE_FETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SHARED_FILE_FETCH_FAIL, payload: error.message });
  }
};
