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
app.get("/franchises", async function (req, res) {
  let franchises = await getTxtFile();
  res.send(franchises);
})

// shows whole franchiseInfo file
app.get("/franchiseInfo", async function (req, res) {
  let franchiseInfo = await getJsonFile();
  res.json(franchiseInfo);
})

// shows info for a specific franchise

async function getTxtFile() {
  try {
    let contents = await fs.readFile("public/franchises.txt", "utf-8");
    return contents;
  } catch (err) {
    console.error(err);
  }
}

async function getJsonFile() {
  try {
    let contents = await fs.readFile("public/franchiseInfo.json", "utf-8");
    return JSON.parse(contents);
  } catch (err) {
    console.error(err);
  }
}

app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.listen(PORT);
