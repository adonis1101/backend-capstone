const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");






async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);

  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: `review id ${reviewId} cannot be found.` });
}


async function read(req, res,) {
    return res.json({ data: res.locals.review });
}



async function list(req, res) {
  const movieId = res.locals.movie.movie_id;

  const data = await service.list(movieId);

  const newData = data.map((element) => {
    const { critic_id, preferred_name, surname, organization_name } = element;

    return {
      ...element,
        critic_id,
      
      critic: {
          critic_id,
        preferred_name,
        surname,
        organization_name,
      },
    };
  });

  return res.json({ data: newData });
}



async function update(req, res, next) {
  if (req.body.data) {
    const updatedReview = { ...res.locals.review, ...req.body.data };
      let data = await service.update(updatedReview);
      console.log(data)
      data.critic = await service.getCritic(updatedReview.critic_id);

    return res.json({ data });
  }
  next({ status: 400, message: `missing update data` });
}



async function destroy(req, res) {
  const { review_id } = res.locals.review;
  await service.delete(review_id);
  res.sendStatus(204);
}


module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(read)]
};
