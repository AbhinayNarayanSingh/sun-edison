import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// *Component
import App from "./App";

// *redux
import { Provider } from "react-redux";
import store from "./store/store.js";

// *Style Sheet
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
