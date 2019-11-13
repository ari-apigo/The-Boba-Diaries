/*
 *  Name: Ariane Apigo
 *  Date: 2019 November 8
 *  Section: AA / Chao Hsu Lin & Austin Jenchi
 *
 *  This is the app.js file for my
 */

"use strict";

const express = require("express");
const fs = require("fs").promises;
const app = express();

// shows list of franchise names and their names as used to navigate API
app.get("/franchises", async function(req, res) {
  let franchises = await getTxtFile();
  res.set("Content-Type", "text/plain");
  res.send(franchises);
})

// shows whole franchiseInfo file
app.get("/franchiseInfo", async function(req, res) {
  let franchiseInfoAll = await getJsonFile("franchiseInfo");
  res.json(franchiseInfoAll);
})

// shows info for a specific franchise
app.get("/franchiseInfo/:name", async function(req, res) {
  let franchiseInfo = await getJsonFile("franchiseInfo/" + req.params.name);
  res.json(franchiseInfo);
})

async function getTxtFile() {
  try {
    let contents = await fs.readFile("public/franchises.txt", "utf-8");
    return contents;
  } catch (err) {
    handleError(err);
  }
}

async function getJsonFile(fileName) {
  try {
    let contents = await fs.readFile("public/" + fileName + ".json", "utf-8");
    return JSON.parse(contents);
  } catch (err) {
    if (err.code === "ENOENT") {
      return "This franchise does not exist in The Boba Diaries. Please use a franchise name " +
      "from the list at /franchiseInfo.";
    } else {
      return handleError(err);
    }
  }
}

function handleError(err) {
  return "An error has occurred. " + err;
}

app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.listen(PORT);
