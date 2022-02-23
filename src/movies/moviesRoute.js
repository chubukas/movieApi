const express = require("express");
const movieController = require("./moviesController");
const protect = require("../middleware/protect");
const IsBasic = require("../middleware/IsBasic");

const router = express.Router();

router.get("/", movieController.getAllmovies);

router.post("/", [protect, IsBasic], movieController.search);

module.exports = router;
