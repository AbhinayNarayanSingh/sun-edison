import axios from "axios";

// ! CONSTANTS

const FILE_FETCH_INITIATE = "FILE_FETCH_INITIATE";
const FILE_FETCH_SUCCESS = "FILE_FETCH_SUCCESS";
const FILE_FETCH_FAIL = "FILE_FETCH_FAIL";

//  ! REDUCER

export const fileFetchReducer = (state = [], action) => {
  switch (action.type) {
    case FILE_FETCH_INITIATE:
      return { loding: true, document: [] };
    case FILE_FETCH_SUCCESS:
      return { loding: false, document: action.payload };
    case FILE_FETCH_FAIL:
      return { loding: false, error: action.payload };

    default:
      return state;
  }
};

//  ! ACTIONS

export const fileFetchAction = (pk) => async (dispatch) => {
  try {
    dispatch({ type: FILE_FETCH_INITIATE });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(
      `http://localhost:8000/file/${pk}`,
      config
    );

    dispatch({ type: FILE_FETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FILE_FETCH_FAIL, payload: error.message });
  }
};
