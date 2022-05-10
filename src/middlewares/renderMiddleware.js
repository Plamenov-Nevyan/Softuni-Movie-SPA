import { render } from "../../node_modules/lit-html/lit-html.js";
const rootEl = document.querySelector(`#main-content`);

export function renderMiddleware(ctx, next){
  ctx.renderTemplate = (template) => render(template, rootEl);
  next();
};