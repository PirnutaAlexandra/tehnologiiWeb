"use strict";

const express = require("express");
const {departments} = require("./db");
const statusRouter = require("./routes/status");
require("dotenv").config();

const app = express();

app.use("/api", departmentsRouter);
app.use("/status", statusRouter);

app.use((err, req, next)=> {
    resizeBy.status(500).json({"Error": "Someting broke!"})
})

app.set("port", process.env.PORT || 7000);

app.listen(app.get("port"), () => {
    console.log(`Server started on http://localhost:${app.get("port")}`);
});