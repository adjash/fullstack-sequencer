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
router.use(express.json());

router.get("/", (req, res) => {
  res.redirect("/api/save");
});

router.post("/save", (req, res) => {
  const { body } = req;
  console.log(body);

  res.status(201).json({
    health: "OK",
  });
});

module.exports = router;
