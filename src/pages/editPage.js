import {editTemplate} from "../templates/editTemplate.js";
import { validateInputs } from "../utils/Validate-Input-Fields.js";
import { editMovie, getSingleMovie } from "../services/moviesService.js";

export async function updateMovie(ctx){
    let movie = await getSingleMovie(ctx.params.movieId);
    ctx.renderTemplate(editTemplate(movie));
    let formEl = document.querySelector(`form`).addEventListener(`submit`, function(e){edit(e, ctx)});
};

async function edit(e, ctx){
    e.preventDefault();
    let {title, description, imageUrl} = Object.fromEntries(new FormData(e.currentTarget));
    let isInfoCorrect = validateInputs([title,description,imageUrl]);
    if(isInfoCorrect){
        let img = imageUrl;
        let editResponse = await editMovie(ctx.params.movieId,{title, description, img});
        if(editResponse.status !== `ok`){
            return;
        }
        else{
            ctx.showNotification(`Movie: ${title}, edited successfully !`);
            ctx.page.redirect(`/details/${ctx.params.movieId}`);
        };
    }
    else{
        e.target.reset();
        ctx.showNotification(`Please enter valid movie information`);
        return;
    };
 };
