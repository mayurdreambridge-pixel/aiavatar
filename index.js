const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/index1", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});


const continueButton = document.getElementById('continueButton');


continueButton.addEventListener('click', async () => {
    console.log("<<<<<<")
});

// ============================================
// INITIALIZATION
// ============================================
(async function init() {
  console.log('🚀 Initializing Live Agent Demo...');
  

})();