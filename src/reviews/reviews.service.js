const knex = require("../db/connection");



function getCritic(critic_id) {
  return knex("critics")
    .select("*")
    .where({ critic_id })
    .first();
}

function read(review_id) {
  return knex("reviews")
    .select("*")
    .where({ review_id })
    .first();
}

function list(movie_id) {
  return knex("reviews")
    .join("critics", "critics.critic_id", "reviews.critic_id")
    .select("reviews.movie_id", "*")
    .where({ movie_id });
}

async function update(updatedReview) {
  const review_id = updatedReview.review_id;
  await knex("reviews")
    .select("*")
    .where({ review_id })
    .update(updatedReview, "*");

  return read(review_id);
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}


module.exports = {
  read,
  update,
  list,
  getCritic,
  delete: destroy,
};
