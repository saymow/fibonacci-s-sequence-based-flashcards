const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const App = express();

App.use(cors());
App.use(express.json())
App.use(routes);


App.listen(3333);