import axios from "axios";
import { fileFetchAction } from "./FileFetchState";
import { sharedFileFetchAction } from "./SharedFileFetchState";

// ! CONSTANTS

const DELETE_DOCUMENT_INITIATE = "DELETE_DOCUMENT_INITIATE";
const DELETE_DOCUMENT_SUCCESS = "DELETE_DOCUMENT_SUCCESS";
const DELETE_DOCUMENT_FAIL = "DELETE_DOCUMENT_FAIL";

//  ! REDUCER

export const deleteDocumentReducer = (state = [], action) => {
  switch (action.type) {
    case DELETE_DOCUMENT_INITIATE:
      return { loding: true };
    case DELETE_DOCUMENT_SUCCESS:
      return { loding: false };
    case DELETE_DOCUMENT_FAIL:
      return { loding: false, error: action.payload };

    default:
      return state;
  }
};

//  ! ACTIONS

export const deleteDocumentAction = (pk, user) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DOCUMENT_INITIATE });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.delete(
      `http://127.0.0.1:8000/delete/file/${pk}`,
      config
    );

    dispatch(fileFetchAction(user));
    dispatch(sharedFileFetchAction(user));

    dispatch({ type: DELETE_DOCUMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_DOCUMENT_FAIL, payload: error.message });
  }
};
