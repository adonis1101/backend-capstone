const knex = require("../db/connection");
const tableName = "movies";

function listShowingMovies(is_showing) {
  return knex("movies")
    .join("movies_theaters as mt", "movies.movie_id", "mt.movie_id")
    .select("movies.runtime_in_minutes as runtime", "*", "mt.is_showing")
    .where({ is_showing })
    .groupBy("movies.movie_id", "mt.is_showing");
}



function list() {
    return knex(tableName)
        .select("movies.runtime_in_minutes as runtime", "*");
}



function read(movieId) {
    return knex("movies")
        .select("*")
        .where({ movie_id: movieId })
        .first();
}

module.exports = {
  list,
  listShowingMovies,
  read,
};