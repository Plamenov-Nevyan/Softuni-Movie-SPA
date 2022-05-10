import { registerTemplate } from "../templates/registerTemplate.js";
import { userOperations } from "../services/user-services.js";
import {validateInputs} from "../utils/Validate-Input-Fields.js";

export function registerView(ctx){
    ctx.renderTemplate(registerTemplate());
    let formEl = document.querySelector(`form`).addEventListener(`submit`, function(e){register(e,ctx)});
};

async function register(e, ctx){
    e.preventDefault();
    let {email, password, repeatPassword} = Object.fromEntries(new FormData(e.currentTarget));
    let isInfoCorrect = validateInputs([email,password,repeatPassword]);
    let doPasswordsMatch = password === repeatPassword;
    if(isInfoCorrect && doPasswordsMatch){
        let userResponse = await userOperations.registerUser({email, password});
        if(userResponse.status !== `ok`){
            return;
        }
        else{
            ctx.showNotification(`Welcome ${email}, your registration is done !`);
            ctx.page.redirect('/catalog');
        };
    }
    else{
        e.target.reset();
        if(!isInfoCorrect){ctx.showNotification(`Please fill all the required fields!`); return}
        else if(!doPasswordsMatch){ctx.showNotification(`Please enter matching passwords!`); return};
    };
 };