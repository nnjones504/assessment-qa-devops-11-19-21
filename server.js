const express = require("express");
const path = require("path");
const app = express();
const { bots, playerRecord } = require("./data");
const { shuffleArray } = require("./utils");

// Server setup for rollbar
require("dotenv").config();
app.use(express.static("public"));

// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: "98cbc6e03b374f5cb7503860b7105ded",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("index.html");
  rollbar.info("HTML file served successfully");
});

app.get("/styles", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.css"));
});
app.get("/js", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.js"));
});

app.get("/api/robots", (req, res) => {
  try {
    /**
     
    res.status(200).send(botsArr);

    ^ Original line of code it was buggy resulting in the bots not being shown
    so i fixed it. idk if we were supposed to so umm yea.

     */
    res.status(200).send(bots);
    rollbar.info("User was able to see bots");
  } catch (error) {
    console.log("ERROR GETTING BOTS", error);
    res.sendStatus(400);
    rollbar.error("Did not show bots");
  }
});

app.get("/api/robots/five", (req, res) => {
  try {
    let shuffled = shuffleArray(bots);
    let choices = shuffled.slice(0, 5);
    let compDuo = shuffled.slice(6, 8);
    rollbar.info("Bots were shuffled");
    res.status(200).send({ choices, compDuo });
  } catch (error) {
    console.log("ERROR GETTING FIVE BOTS", error);
    rollbar.error("Bots did not shuffle");
    res.sendStatus(400);
  }
});

app.post("/api/duel", (req, res) => {
  try {
    // getting the duos from the front end
    let { compDuo, playerDuo } = req.body;

    // adding up the computer player's total health and attack damage
    let compHealth = compDuo[0].health + compDuo[1].health;
    let compAttack =
      compDuo[0].attacks[0].damage +
      compDuo[0].attacks[1].damage +
      compDuo[1].attacks[0].damage +
      compDuo[1].attacks[1].damage;

    // adding up the player's total health and attack damage
    let playerHealth = playerDuo[0].health + playerDuo[1].health;
    let playerAttack =
      playerDuo[0].attacks[0].damage +
      playerDuo[0].attacks[1].damage +
      playerDuo[1].attacks[0].damage +
      playerDuo[1].attacks[1].damage;

    // calculating how much health is left after the attacks on each other
    let compHealthAfterAttack = compHealth - playerAttack;
    let playerHealthAfterAttack = playerHealth - compAttack;

    // comparing the total health to determine a winner
    if (compHealthAfterAttack > playerHealthAfterAttack) {
      playerRecord.losses++;
      res.status(200).send("You lost!");
      rollbar.info("User lost the duel");
    } else {
      //playerRecord.losses++;
      // ^ another bug original code before fix
      playerRecord.wins++;
      res.status(200).send("You won!");
      rollbar.info("User won the duel");
    }
  } catch (error) {
    console.log("ERROR DUELING", error);
    res.sendStatus(400);
  }
});

app.get("/api/player", (req, res) => {
  try {
    res.status(200).send(playerRecord);
  } catch (error) {
    console.log("ERROR GETTING PLAYER STATS", error);
    res.sendStatus(400);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
