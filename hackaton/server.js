const express = require("express");
const fs = require("fs");
const bp = require("body-parser");
const DB = require("./modules/db.js");
let imported = require("./public/script.js");
imported.showPlayer;
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: "5432",
    user: "postgres",
    password: "123",
    database: "hackaton",
  },
});

const app = express();

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.use("/", express.static(__dirname + "/public"));

app.post("/user", (req, res) => {
  console.log(req.body);
  let users = [];
  try {
    const f = fs.readFileSync("./users");
    users = JSON.parse(f);
  } catch (e) {
    // console.log(e);
  } finally {
    users.push(req.body);
  }

  fs.writeFile("./users", JSON.stringify(users), (err) => {
    if (err) {
      console.log("error writing to file");
    }
  });
  DB.createUser(req.body)
    .then((data) => {
      res.send({ message: "OK" });
    })
    .catch((err) => {
      res.send({ message: err.detail });
    });
});

app.get("/show", (req, res) => {
  db("players")
    .select("first_name", "last_name", "country", "position")
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: err.detail });
    });
});

app.post("/delete", (req, res) => {
  console.log(req.body);
  const { firstName, lastName } = req.body;
  db("players")
    .where({ first_name: firstName, last_name: lastName })
    .del(["first_name", "last_name", "country", "position"])
    .then((data) => {
      res.send({
        message: `<h3 style = "color:white">Found and Deleted=></h3>   <h1 style = "color:white">${data[0].first_name} ${data[0].last_name} -  Country: ${data[0].country} - Position: ${data[0].position}</h1>`,
      });

      //   res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Not Found to delete" });
    });
});

app.post("/find", (req, res) => {
  console.log(req.body);
  const { firstName, lastName } = req.body;
  db("players")
    .select("first_name", "last_name", "country", "position")
    .where({ first_name: firstName, last_name: lastName })
    .then((data) => {
      console.log(data);
      if (data.length > 0) {
        res.send({
          message: `<h3 style = "color:white">Found=></h3>   <h1 style = "color:white">${data[0].first_name} ${data[0].last_name} -  Country: ${data[0].country} - Position: ${data[0].position}</h1>`,
        });
      } else {
        res.send({ message: "Not Found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: err.detail });
    });
});

app.listen(3000);
