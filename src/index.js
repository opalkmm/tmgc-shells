// const express = require("express");
// const cheerio = require("cheerio");
// const download = require("node-image-downloader");
// const request = require("request");

// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   let url = "http://www.tamashell.com/p1.php";

//   request(url, (error, response, html) => {
//     if (!error) {
//       console.log(html);
//     }
//   });
// });

// app.listen(port);
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
// registerServiceWorker();
