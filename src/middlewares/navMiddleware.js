import { render } from "../../node_modules/lit-html/lit-html.js";
import * as navLinks from "../templates/navTemplate.js";
import {authOperations} from "../utils/authentication.js";

const navLinksList = document.querySelector(`#nav-links-list`);

export function navMiddleware(ctx, next){
  let user = authOperations.getUser();
  user ? render(navLinks.userLinks(user), navLinksList) : render(navLinks.guestLinks(), navLinksList);
  next();
};