const sqlite3 = require("sqlite3");

const dbTables = `
    CREATE TABLE IF NOT EXISTS users(
        id integer NOT NULL PRIMARY KEY,
        email text NOT NULL UNIQUE,
        username text NOT NULL UNIQUE,
        password text NOT NULL
    );
    CREATE TABLE IF NOT EXISTS blogs (
        id integer NOT NULL PRIMARY KEY,
        title text NOT NULL,
        content text NOT NULL,
        posted_on text NOT NULL
    );
`;

const DB = new sqlite3.Database("./blogdb.sqlite", (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  //   console.log("database created");
  DB.exec(dbTables, async (err) => {
    try {
      console.log("DB tables created");
    } catch {
      console.error(err.message);
      return;
    }
  });
});
DB.close((err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  return;
});
