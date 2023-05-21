"use strict";
const http = require('http');
const dotenv = require('dotenv');
dotenv.config();
const App = require("./app.ts");
const server = http.createServer(App);
const port = process.env.PORT;
App.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
