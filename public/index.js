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
   * Loads franchise names from the API onto the page and sets up event-listener on image.
   */
  function init() {
    fillFranchiseList();
    document.getElementById("back").addEventListener("click", toggleList);
  }

  /**
   * Requests for the franchise names from the API.
   */
  function fillFranchiseList() {
    fetch("/franchises")
      .then(checkStatus)
      .then(resp => resp.text())
      .then(splitLines)
      .then(splitNames)
      .then(displayFranchiseList)
      .catch(handleError);
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
   * Shows alert with error details when API request fails.
   * @param {Response} error - details regarding reason for failed API request
   */
  function handleError(error) {
    let info = document.getElementById("info");
    let alert = document.createElement("p");
    alert.textContent = "Woops! Do you live in a world without boba?? " + error;
    alert.classList.add("alert");
    info.appendChild(alert);
  }

  /**
   * Splits text file by line.
   * @param {string} text - text data from API
   * @return {array} each line of text data from API as a string value in an array
   */
  function splitLines(text) {
    return text.split("\n");
  }

  /**
   * Further splits text data from API to separate franchises' full names and short names.
   * Saves short names in a global array for later use.
   * @param {array} text - each line of text data from API as a string value in an array
   * @return {array} fullnames - array of strings, the full names of each franchise
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

  /**
   * Processes and formats API data (list of franchises) for display on the page.
   * @param {Response} fullnames - data from API: franchises' full names
   */
  function displayFranchiseList(fullnames) {
    let franchiseList = document.getElementById("franchiseList");
    for (let i = 0; i < fullnames.length; i++) {
      let franchise = document.createElement("li");
      franchise.textContent = fullnames[i];
      franchise.id = shortnames[i];
      franchise.addEventListener("click", getInfo);
      franchiseList.appendChild(franchise);
    }
  }

  /**
   * Requests for a specific franchise's information from the API.
   */
  function getInfo() {
    let shortname = this.id;
    fetch("/franchiseInfo/" + shortname)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(displayInfo)
      .catch(console.error);
  }

  /**
   * Processes and formats API data (specific franchise information) for display on the page.
   * @param {Response} data - data from API: specific franchise's information
   */
  function displayInfo(data) {
    let infoSection = document.getElementById("info");
    document.getElementById("franchiseList").classList.toggle("hidden");
    document.getElementById("back").classList.toggle("hidden");
    let name = document.createElement("h3");
    name.textContent = data.name;
    let logo = document.createElement("img");
    logo.classList.add("logo");
    logo.src = data.logo;
    logo.alt = "Logo of " + data.name;
    let specialty = document.createElement("p");
    specialty.textContent = "Specializes in " + data.specialty;
    let location = document.createElement("p");
    location.textContent = "Locations in " + data.location;
    let review = document.createElement("p");
    review.classList.add("review");
    review.textContent = data.review;
    infoSection.appendChild(name);
    infoSection.appendChild(logo);
    infoSection.appendChild(specialty);
    infoSection.appendChild(location);
    infoSection.appendChild(review);
    displayMenuInfo(data);
  }

  /**
   * Processes and formats API data (specific franchise's menu information) for display on
   * the page.
   * @param {Response} data - data from API: specific franchise's menu information
   */
  function displayMenuInfo(data) {
    let infoSection = document.getElementById("info");
    let menu = document.createElement("img");
    menu.classList.add("menu");
    menu.src = data.menu;
    menu.alt = "Menu of " + data.name;
    let menuCredit = document.createElement("p");
    menuCredit.classList.add("note");
    menuCredit.textContent = data.menuCredit;
    infoSection.appendChild(menu);
    infoSection.appendChild(menuCredit);
  }

  /**
   * Switches user's view between the franchise list and a specific franchise's information.
   */
  function toggleList() {
    document.getElementById("franchiseList").classList.toggle("hidden");
    document.getElementById("back").classList.toggle("hidden");
    document.getElementById("info").innerHTML = "";
  }

})();
