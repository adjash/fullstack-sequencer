const express = require("express");
const router = express.Router();

//middleware for any time someone hits an endpoint
//mostly just for debugging
//stick request info logging in here etc
const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};

router.use(timeLog);

router.get("/", (req, res) => {
  res.redirect("/api/health");
});

router.get("/health", (req, res) => {
  console.log("health endpoint hit");
  res.status(200).json({
    health: "OK",
  });
});

module.exports = router;
