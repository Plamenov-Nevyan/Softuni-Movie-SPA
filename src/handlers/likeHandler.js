import { addLike } from "../services/moviesService.js";

export async function like(ctx){
    let movieId = ctx.params.specificMovie;
    await addLike({movieId});
    ctx.showNotification(`Thank you for liking!`);
    ctx.page.redirect(`/details/${ctx.params.specificMovie}`);
};