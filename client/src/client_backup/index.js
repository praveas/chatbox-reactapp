import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

//Targetting root element inside html
//basic boilerplate for react application
ReactDOM.render(<App />, document.querySelector("#root"));
//this will inject all the component into public/index.html
