import {createTemplate} from "../templates/createTemplate.js";
import { addMovie } from "../services/moviesService.js";
import { validateInputs } from "../utils/Validate-Input-Fields.js";
import {authOperations} from "../utils/authentication.js";

export function createView(ctx){
    ctx.renderTemplate(createTemplate());
    let formEl = document.querySelector(`form`).addEventListener(`submit`, function(e){
        create(e, ctx, authOperations.getUser()._id)});
};

async function create(e, ctx, _ownerId){
    e.preventDefault();
    let {title, description, imageUrl} = Object.fromEntries(new FormData(e.currentTarget));
    let isInfoCorrect = validateInputs([title,description,imageUrl]);
    if(isInfoCorrect){
        let img = imageUrl;
        let createResponse = await addMovie({title, description, img});
        if(createResponse.status !== `ok`){
            return;
        }
        else{
            ctx.showNotification(`New movie: ${title}, added to collection !`);
            e.target.reset();
            ctx.page.redirect('/');
        };
    }
    else{
        e.target.reset();
        ctx.showNotification(`Please enter valid movie information`);
        return;
    };
 };