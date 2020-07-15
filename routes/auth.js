const router = require("express").Router();
const User = require(__dirname + "/../model/User.js");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/register", (req, res) => {
  const emailExists = User.findOne({ email: req.body.email }, function (
    err,
    user
  ) {
    if (user) {
      res.status(400).send("User already exists");
    } else {
      bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        const newUser = new User({
          email: req.body.email,
          password: hash,
        });
        newUser.save(function (err) {
          if (err) {
            console.log(err);
          }
          res.send("Done!");
          console.log("Success");
        });
      });
    }
  });
});

module.exports = router;
