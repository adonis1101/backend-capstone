const knex = require("../db/connection");

function list() {
  return knex("theaters")
    .join("movies_theaters as mt", "theaters.theater_id", "mt.theater_id")
    .join("movies", "mt.movie_id", "movies.movie_id")
    .select("*");
}

module.exports = {
  list,
};
