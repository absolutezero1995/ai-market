const express = require("express");
const config = require("./config/serverConfig.js"); 
const IndexRoute = require("./routes/index.routes.js");

const app = express();

config(app);

const PORT = 3000;

app.use("/", IndexRoute);

app.listen(PORT, () => {
    console.log("Сервер запущен на порту:", PORT);
});
