import { catalogTemplate } from "../templates/catalogTemplate.js";
import { getAllMovies } from "../services/moviesService.js";
import { authOperations } from "../utils/authentication.js";
import { toggle } from "../utils/pagerBtnsClassToggle.js";

export async function catalogView(ctx){
    const params = new URLSearchParams(ctx.querystring);
    let page = Number(params.get(`page`)) || 1;
    let user = Boolean(authOperations.getUser());
    let moviesInfo = await getAllMovies(page);
    ctx.renderTemplate(catalogTemplate(
        moviesInfo.movies, user, page, moviesInfo.pages, moviesInfo.pagesDispersed ));
    let paginationSection = document.querySelector(`.section-pagination`).addEventListener(`click`, toggle);
};