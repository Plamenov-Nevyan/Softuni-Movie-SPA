import { revokeLike } from "../services/moviesService.js";

export async function revokeMovieLike(ctx){
  await revokeLike(ctx.params.likeId);
  ctx.page.redirect(`/details/${ctx.params.movieId}`);
};