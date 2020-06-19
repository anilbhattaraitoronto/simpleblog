const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3");

//open the database

router.get("/", (req, res) => {
  const DB = new sqlite3.Database("./blogdb.sqlite", (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
    // console.log("database opened");
  });
  let sql = `SELECT * FROM blogs;`;
  DB.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return;
    }
    // console.log("All blogs are retrieved");

    res.render("blogs/index", { blogs: rows, title: "All Blogs" });
  });
});

router.get("/newblog", (req, res) => {
  res.render("blogs/newblog", { title: "create new blog" });
});

router.post("/", (req, res) => {
  const DB = new sqlite3.Database("./blogdb.sqlite", (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
    // console.log("database opened");
  });
  let sql = `INSERT INTO blogs (title, content, posted_on) VALUES(?,?,?);`;
  DB.run(
    sql,
    [req.body.title, req.body.content, new Date().toDateString()],
    (err) => {
      if (err) {
        console.error(err.message);
        return;
      }
      //   console.log(`A blog has been added with title: ${req.body.title}`);
      res.redirect("/blogs");
      DB.close((err) => {
        if (err) {
          console.error(err.message);
          return;
        }
        return;
      });
      //   console.log(req.body);
    },
  );
});

module.exports = router;
