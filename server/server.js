const express = require("express");
const cors = require("cors");

const app = express();

const SERVER_PORT = 4444;

app.use(express.json());
app.use(cors());

const { getSets, createNewSet, deleteSet, updateSet } = require("./controller");

app.get("/api/sets", getSets);
app.post("/api/sets", createNewSet);
app.delete("/api/sets/:id", deleteSet);
app.put("/api/sets/:id", updateSet)

app.listen(SERVER_PORT, () =>
  console.log(`Server listening on port ${SERVER_PORT}`)
);
