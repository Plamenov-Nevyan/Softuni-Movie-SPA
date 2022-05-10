import { userOperations } from "../services/user-services.js";
import { authOperations } from "../utils/authentication.js";

export async function logout(ctx){
    let user = authOperations.getUser();
    await userOperations.logoutUser();
    ctx.showNotification(`Goodbye, ${user.email}`);
    ctx.page.redirect('/');
};