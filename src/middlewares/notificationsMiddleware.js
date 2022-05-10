const notifications = document.querySelector(`.notification`);
const spanEl = notifications.querySelector(`span`);
const hide = () => {notifications.style.display = `none`};
const show = (message) => {
    spanEl.textContent = message;
    notifications.style.display = `block`;
    const timeoutHide = setTimeout(hide, 3000);
};

export const notificatMiddleware = (ctx, next) => {
    ctx.showNotification = show;
    next();
};