/*
 *  Name: Ariane Apigo
 *  Date: 2019 November 8
 *  Section: AA / Chao Hsu Lin & Austin Jenchi
 *
 *  This is the app.js file for my "The Boba Diaries" site. It acts as the server containing The
 *  Boba API and returns its information per the user's valid requests.
 */

"use strict";

const express = require("express");
const fs = require("fs").promises;
const app = express();

const INVALID_PARAM_ERROR = 400;
const DEFAULT_PORT = 8000;

/**
 * returns list of franchise names (full names) and their names as used to
 * navigate API (short names)
 */
app.get("/franchises", async function(req, res) {
  let franchises = await getTxtFile();
  res.set("Content-Type", "text/plain");
  res.send(franchises);
});

/**
 * returns whole franchiseInfo JSON (master list of all franchises' information)
 */
app.get("/franchiseInfo", async function(req, res) {
  let franchiseInfoAll = await getJsonFile("franchiseInfo");
  res.json(franchiseInfoAll);
});

/**
 * returns JSON of a specific franchise's information
 */
app.get("/franchiseInfo/:name", async function(req, res) {
  let franchiseInfo = await getJsonFile("franchiseInfo/" + req.params.name);
  if (franchiseInfo.errno) {
    res.status(INVALID_PARAM_ERROR).send("The franchise \"" + req.params.name + "\" does not " +
                                         "exist in The Boba Diaries. Please use a franchise " +
                                         "name from the list at /franchiseInfo.");
  } else {
    res.json(franchiseInfo);
  }
});

/**
 * Reads franchises.txt file, which consists of a list of all franchises' names.
 * @return {promise} contents - contents of the .txt file
 *         or {error} - error message upon inability to read file
 */
async function getTxtFile() {
  try {
    let contents = await fs.readFile("public/franchises.txt", "utf-8");
    return contents;
  } catch (err) {
    return "An error has occurred. " + err;
  }
}

/**
 * Reads a .json file, which consists of one or all franchises' information.
 * @param {string} fileName - name of .json file
 * @return {JSON} contents - contents of the .json file as a JSON object
 *         or {error} - error message upon inability to read file
 */
async function getJsonFile(fileName) {
  try {
    let contents = await fs.readFile("public/" + fileName + ".json", "utf-8");
    return JSON.parse(contents);
  } catch (err) {
    return err;
  }
}

app.use(express.static("public"));
const PORT = process.env.PORT || DEFAULT_PORT;
app.listen(PORT);
