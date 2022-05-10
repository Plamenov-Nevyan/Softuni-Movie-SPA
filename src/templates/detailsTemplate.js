import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { commentsTemplate } from "./commentsTemplate.js";

export const detailsUserTemplate = (movie,totalLikes,isOwner,isLikedAlready, commentsInfo,ctx,userEmail,addComment) => html`
<section id="movie-example">
    <div class="container">
        <div class="row bg-light text-dark">
            <h1>Movie title: ${movie.title}</h1>

            <div class="col-md-8">
                <img class="img-thumbnail" src="${movie.img}"
                    alt="Movie">
            </div>
            <div class="col-md-4 text-center">
                <h3 class="my-3 ">Movie Description</h3>
                <p>${movie.description}</p>
                ${isOwner
                 ? html`
                 <a class="btn btn-danger" href="/details/delete/${movie._id}">Delete</a>
                 <a class="btn btn-warning" href="/details/edit/${movie._id}">Edit</a>`
                 : html`${isLikedAlready
                   ? html`<a class="btn btn-primary" href="/details/unlike/${movie._id}/${isLikedAlready._id}">Unlike</a>`
                   : html`<a class="btn btn-primary" href="/details/like/${movie._id}">Like</a>`
                }`
                }
                <span class="enrolled-span">Liked ${totalLikes}</span>
                ${commentsTemplate(commentsInfo, movie._id, true, ctx,userEmail,addComment)}
            </div>
        </div>
    </div>
</section>
`;

export const detailsGuestTemplate = (movie,totalLikes, commentsInfo) => html`
<section id="movie-example">
    <div class="container">
        <div class="row bg-light text-dark">
            <h1>Movie title: ${movie.title}</h1>

            <div class="col-md-8">
                <img class="img-thumbnail" src="${movie.img}"
                    alt="Movie">
            </div>
            <div class="col-md-4 text-center">
                <h3 class="my-3 ">Movie Description</h3>
                <p>${movie.description}</p>
                <span class="enrolled-span">Liked ${totalLikes}</span>
                ${commentsTemplate(commentsInfo,movie._id, false)}
            </div>
        </div>
    </div>
</section>
`;