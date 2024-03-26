var express = require("express");
var router = express.Router();
const User = require("./users");
const pl = require("passport-local");
const passport = require("passport");
passport.use(new pl(User.authenticate()));
const Song = require("./song");
const multer = require("multer");

// multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// /* GET routes */ last thing did
router.get("/", isloggIn, async function (req, res, next) {
  const allSongs = await Song.find({});
  console.log(allSongs)
  res.render("index", { allSongs });
});

router.get("/signup", function (req, res, next) {
  res.render("signup");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.get("/upload", function (req, res, next) {
  res.render("upload");
});

router.get("/user", function (req, res, next) {
  res.render("user");
});

/* POST routes */
router.post("/upload", upload.single("songfile"), async (req, res) => {
  try {
    const song = await Song.create({
      song: req.file.filename,
      title: req.body.title,
      artish: req.body.artish,
    });
    await song.save();

    res.redirect("/");
  } catch (error) {
    console.log(`error found >>>`, error);
  }
});

router.post("/signup", function (req, res, next) {
  try {
    const data = User({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
    });

    User.register(data, req.body.password).then(function (registeredUser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    });
  } catch (error) {
    console.error("Server error >>>", error);
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
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
