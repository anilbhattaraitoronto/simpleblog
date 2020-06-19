const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

const PORT = process.env.PORT || 3000;

//create database

app.set("view engine", "ejs")
  .set("views", __dirname + "/views")
  .set("layout", "layouts/layout");
app.use(bodyParser.urlencoded({ limit: "3mb", extended: false }))
  .use(express.static(path.join(__dirname, "/public")))
  .use(expressLayouts);

//import routes

const indexRouter = require("./routes/index");
const blogsRouter = require("./routes/blogs");
const usersRouter = require("./routes/users");

app.use("/", indexRouter)
  .use("/blogs", blogsRouter)
  .use("/users", usersRouter);

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
