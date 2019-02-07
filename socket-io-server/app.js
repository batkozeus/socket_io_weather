const express = require("express");
var http = require('http');
const socketIo = require("socket.io");
const axios  = require("axios");
const weatherKey = require("./config.js")
const port = process.env.PORT || 4001;

const app = express();

app.get("/", (req, res) => {
    res.send({ response: "I am alive" }).status(200);
});

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
    console.log("New client connected"), setInterval(
        () => getApiAndEmit(socket),
        120000
    );
});

const getApiAndEmit =  async socket => {
    try {
        const res = await axios.get(`https://api.darksky.net/forecast/${weatherKey.WEATHER_KEY}/50.45466,30.5238`);
        socket.emit("FromAPI", res.data.currently.temperature);
    } catch (error) {
        console.error(`Error: ${eroor.code}`);
    }
};

server.listen(port,  () => console.log(`Listening on port ${port}`));
