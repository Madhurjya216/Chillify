var express = require("express");
var router = express.Router();
const User = require("./users");
const pl = require("passport-local");
const passport = require("passport");
passport.use(new pl(User.authenticate()));

/* GET routes */
router.get("/home", isloggIn, function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/signup", function (req, res, next) {
  res.render("signup");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

/* POST routes */
router.post("/signup", function (req, res, next) {
  try {
    const data = User({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
    });

    User.register(data, req.body.password).then(function (registeredUser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect(data, "/home");
      });
    });
  } catch (error) {
    console.error("Server error >>>", error);
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/login");
  }); 
});

function isloggIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}


module.exports = router;
