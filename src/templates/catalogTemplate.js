import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

export const catalogTemplate = (movies, user,page,totalPages, pagesDispersed) => html`
<h1 class="text-center">Movies</h1>
${pager(page,totalPages, pagesDispersed)}
${user
        ? addMovieBtn()
        : nothing
    }
<section id="movie">
    <div class=" mt-3 ">
        <div class="row d-flex d-wrap">
            <div class="card-deck d-flex justify-content-center">
                  ${movies.map(movie => movieCard(movie))}
            </div>
        </div>
    </div>
</section>
`;

const movieCard = (movie) => html`
<div class="card mb-4">
    <img class="card-img-top" src="${movie.img}" alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <a href="/details/${movie._id}">
            <button type="button" class="btn btn-info">Details</button>
        </a>
    </div>

</div>
`;

const addMovieBtn = () => html`
<section id="add-movie-button">
    <a href="/create" class="btn btn-warning ">Add Movie</a>
</section>
`;

const pager = (page,totalPages, pagesDispersed) => html`
<div class="section-pagination">
<span>Page ${page} of ${totalPages}</span>
  <div id="pagers-container">
   ${pagesDispersed.map(page => html`<a class = "${page === 1 ?`pager  active`:`pager`}" href="/catalog/?page=${page}">${page}</a>`)}
  </div>
</div>
`;