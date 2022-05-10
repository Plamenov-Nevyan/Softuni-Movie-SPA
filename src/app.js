import page from "../node_modules/page/page.mjs";
import { removeMovie } from "./handlers/deleteMovieHandler.js";
import { like } from "./handlers/likeHandler.js";
import { logout } from "./handlers/logoutHandler.js";
import { revokeMovieLike } from "./handlers/revokeLikeHandler.js";
import { navMiddleware } from "./middlewares/navMiddleware.js";
import { notificatMiddleware } from "./middlewares/notificationsMiddleware.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { catalogView } from "./pages/catalogPage.js";
import { createView } from "./pages/createPage.js";
import { detailsView } from "./pages/detailsPage.js";
import { updateMovie } from "./pages/editPage.js";
import { homeView } from "./pages/homePage.js";
import { loginView } from "./pages/loginPage.js";
import { registerView } from "./pages/registerPage.js";

page(renderMiddleware);
page(navMiddleware);
page(notificatMiddleware);
page('/', homeView);
page('/catalog', catalogView);
page('/create', createView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logout);
page('/details/:specificMovie', detailsView);
page('/details/edit/:movieId', updateMovie);
page('/details/delete/:movieId', removeMovie);
page('/details/like/:specificMovie', like);
page('/details/unlike/:movieId/:likeId', revokeMovieLike);


page.start();