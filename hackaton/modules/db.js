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

function createUser({ firstName, lastName, countryName, positionName }) {
  return db("players")
    .insert({
      first_name: firstName,
      last_name: lastName,
      country: countryName,
      position: positionName,
    })
    .returning("*");
}

module.exports = {
  createUser,
};
