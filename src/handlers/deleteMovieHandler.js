import { deleteMovie, getSingleMovie } from "../services/moviesService.js";

export async function removeMovie(ctx){
  let movie = await getSingleMovie(ctx.params.movieId);
  await deleteMovie(ctx.params.movieId);

  ctx.showNotification(`Movie: ${movie.title}, was deleted from the collection !`);
  ctx.page.redirect('/');
};