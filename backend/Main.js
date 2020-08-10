const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const Router = require("./Router");
const { Store } = require("express-session");

app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "LaPyae",
  password: "La09799924744",
  database: "loginappproto",
});

db.connect(function (err) {
  if (err) {
    console.log("DB error");
    throw err;
    return false;
  }
});
const year = 5;
const sessionStore = new MySQLStore(
  {
    expiration: 365 * year * 86400 * 1000,
    endConnectionOnClose: false,
  },
  db
);

app.use(
  session({
    key: "askldjfklasj123p4j21k",
    secret: "sakdjfallskdjrrew",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 365 * year * 86400 * 1000,
      httpOnly: false,
    },
  })
);

new Router(app, db);

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'build', 'index.html'));
});

app.listen(3000);