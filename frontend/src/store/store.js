import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

// Reducer Import
import { userAuthenticationReducer } from "./UserAuthenticationState";
import { fileFetchReducer } from "./FileFetchState";
import { fileUploadReducer } from "./DocumentUploadState";
import { sharedFileFetchReducer } from "./SharedFileFetchState";
import { deleteDocumentReducer } from "./DeleteDocumentState";

const reducer = combineReducers({
  user: userAuthenticationReducer,
  userFile: fileFetchReducer,
  sharedFile: sharedFileFetchReducer,
  userFileUpload: fileUploadReducer,
  deleteDocument: deleteDocumentReducer,
});

const userFromLocalStorage = localStorage.getItem("user")
  ? { userInfo: JSON.parse(localStorage.getItem("user")) }
  : [];

const initialState = { user: userFromLocalStorage };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
