/*
 *  Name: Ariane Apigo
 *  Date: 2019 November 8
 *  Section: AA / Chao Hsu Lin & Austin Jenchi
 *
 *  This is the index.js file for my
 */

"use strict";
(function() {
  let shortnames = [];

  window.addEventListener("load", init);

  /**
   *
   */
  function init() {
    fillFranchiseList();
  }

  function fillFranchiseList() {
    fetch("/franchises")
      .then(checkStatus)
      .then(resp => resp.text())
      .then(splitLines)
      .then(splitNames)
      .then(console.log(shortnames))
      .catch(console.error);
  }

  /**
   * Checks status of the request to the API.
   * @param {Response} response - result of fetching from the API
   * @return {Response} response - returned when successfully connects request to API
   */
  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response;
  }

  /**
   * Splits text file by line.
   * @param {string} text - text data from API
   * @return {array} each line of text data from API as a string value in an array
   */
  function splitLines(text) {
    /*
     * The following section exercise was consulted:
     * https://courses.cs.washington.edu/courses/cse154/19au/sections/week05-tues/code/solution/ajaxpets/ajaxpets.html
     */
    return text.split("\n");
  }

  /**
   * Further splits text data from API to separate Pokemons' full names and short names.
   * Then sorts each into respective global arrays for later use.
   * @param {array} text - each line of text data from API as a string value in an array
   * @return {array} fullnames - array of strings, the full names of each Pokemon
   */
  function splitNames(text) {
    let fullnames = [];
    for (let i = 0; i < text.length; i++) {
      let names = text[i].split(":");
      fullnames.push(names[0]);
      shortnames.push(names[1]);
    }
    return fullnames;
  }

  })();
