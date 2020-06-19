const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3");

router.get("/userauth", (req, res) => {
  res.render("users/userauth", { title: "Register or Login" });
});

router.post("/register", (req, res) => {
  //open the database
  if (req.body.password === req.body.confirm_password) {
    const DB = new sqlite3.Database("./blogdb.sqlite", (err) => {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log("database opened");
    });
    //find the row containing either the username or the email
    let sql = `SELECT * from users WHERE email = ? OR username = ?;`;
    DB.run(sql, [req.body.email, req.body.username], (err, row) => {
      if (err) {
        console.log("Either the email or the username is already used.");
        return;
      }
      res.redirect("/users/userauth");

      let insertSql =
        `INSERT INTO users (username, email, password) values(?,?,?);`;
      DB.run(
        insertSql,
        [req.body.username, req.body.email, req.body.password],
        (err) => {
          if (err) {
            console.error(err.message);
            return;
          }
          console.log("user is created");
          //close the database
          DB.close((err) => {
            if (err) {
              console.error(err.message);
              return;
            }
            console.log("database closed");
            return;
          });
          res.redirect("/");
        },
      );
    });
  } else {
    console.log("Passwords do not match");
    res.redirect("/users/userauth");
  }

  //if it exists redirect to login with message
  //if its length row.length === 0 insert the credentials into the users table
  //before inserting create hash+salted password with bcrypt and use the value generated as password
});

module.exports = router;
