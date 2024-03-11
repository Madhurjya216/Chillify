var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/signup", function (req, res, next) {
  res.render("signup");
});

// router.post("/signup", function (req, res, next) {
//   try {
//   } catch (error) {
//     console.error("Server error >>>", error);
//   }
// });

module.exports = router;
