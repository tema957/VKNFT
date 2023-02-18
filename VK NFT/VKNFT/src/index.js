import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "../src/App/App";
import { App1 } from '../src/App/App_1';
import { App2 } from '../src/App/App_2';
import { App3 } from '../src/App/App_3';
import { App4 } from '../src/App/App_4';
import index from '../src/components1/index';
import NFTs from '../src/AppNFTIArt'
import NFTs1 from '..src/AppNFTMV'

// Init VK  Mini App
bridge.send("VKWebAppInit");

ReactDOM.render(<App />, document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
