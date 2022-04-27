import axios from "axios";
import { fileFetchAction } from "./FileFetchState";
import { sharedFileFetchAction } from "./SharedFileFetchState";

// ! CONSTANTS

const DOCUMENT_UPLOAD_INITIATE = "DOCUMENT_UPLOAD_INITIATE";
const DOCUMENT_UPLOAD_SUCCESS = "DOCUMENT_UPLOAD_SUCCESS";
const DOCUMENT_UPLOAD_FAIL = "DOCUMENT_UPLOAD_FAIL";

//  ! REDUCER

export const fileUploadReducer = (state = [], action) => {
  switch (action.type) {
    case DOCUMENT_UPLOAD_INITIATE:
      return { loding: true, documentUpload: [] };
    case DOCUMENT_UPLOAD_SUCCESS:
      return { loding: false, documentUpload: action.payload };
    case DOCUMENT_UPLOAD_FAIL:
      return { loding: false, error: action.payload };

    default:
      return state;
  }
};

//  ! ACTIONS

export const fileUploadAction =
  (pk, document, description) => async (dispatch) => {
    try {
      dispatch({ type: DOCUMENT_UPLOAD_INITIATE });

      let fd = new FormData();
      fd.append("document", document, document.name);
      fd.append("user", pk);
      fd.append("description", description);
      fd.append("access", 2);
      fd.append("modifier", "");

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `http://localhost:8000/upload/file`,
        fd,
        config
      );

      dispatch(fileFetchAction(pk));
      dispatch(sharedFileFetchAction(pk));
      dispatch({ type: DOCUMENT_UPLOAD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: DOCUMENT_UPLOAD_FAIL, payload: error.message });
    }
  };
