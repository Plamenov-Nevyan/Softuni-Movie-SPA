import { html } from "../../node_modules/lit-html/lit-html.js";

export const userLinks = (user) => html`
<li class="nav-item">
    <a class="nav-link">Welcome, ${user.email}</a>
</li>
<li class="nav-item">
    <a class="nav-link" href="/logout">Logout</a>
</li>
`;

export const guestLinks = () => html`
<li class="nav-item">
    <a class="nav-link" href="/login">Login</a>
</li>
<li class="nav-item">
    <a class="nav-link" href="/register">Register</a>
</li>
`;