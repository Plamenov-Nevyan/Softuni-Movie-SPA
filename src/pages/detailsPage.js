import {detailsUserTemplate, detailsGuestTemplate} from "../templates/detailsTemplate.js";
import * as movieServices from "../services/moviesService.js";
import { authOperations } from "../utils/authentication.js";

export async function detailsView(ctx){
    let params = new URLSearchParams(ctx.querystring);
    let page = Number(params.get(`page`)) || 1;
    let movieId = ctx.params.specificMovie;
    let [movie, totalLikes, commentsInfo] = await Promise.all([
        movieServices.getSingleMovie(movieId),
        movieServices.getTotalLikes(movieId),
        movieServices.getComments(movieId, page)
    ]);
    commentsInfo.page = page;
    let user = authOperations.getUser();
    if(user){
        let isLikedAlready = await movieServices.checkIfUserAlreadyLiked(user._id, movie._id);
        let isOwner = user._id === movie._ownerId;
        if(isLikedAlready.length > 0){
            isLikedAlready = isLikedAlready[0];
        }
        else{isLikedAlready = null};
        ctx.renderTemplate(detailsUserTemplate(
            movie, totalLikes, isOwner,isLikedAlready, commentsInfo, ctx, user.email, addComment));    
    }
    else{
        ctx.renderTemplate(detailsGuestTemplate(movie, totalLikes, commentsInfo));
        ctx.showNotification(`Sign up to like and comment !`)
    };
};

const addComment = async (e, ctx, userEmail) => {
   e.preventDefault();
   let {content} = Object.fromEntries(new FormData(e.currentTarget));
   let movieId= ctx.params.specificMovie;
   if(content !== ``){
    if(content.split(``).length > 80){
        return alert (`maximum characters allowed are 80 !`);
    };
   let comment = await movieServices.postComment({content, userEmail, movieId});
   e.target.reset();
   ctx.page.redirect(`/details/${movieId}`);
   }
   else{
       alert(`You can't post an empty comment !`);
   };
};