import { loginTemplate } from "../templates/loginTemplate.js";
import { userOperations } from "../services/user-services.js";
import {validateInputs} from "../utils/Validate-Input-Fields.js";

export function loginView(ctx){
    ctx.renderTemplate(loginTemplate());
    let formEl = document.querySelector(`form`).addEventListener(`submit`, function(e){login(e,ctx)});
};

async function login(e, ctx){
   e.preventDefault();
   let {email, password} = Object.fromEntries(new FormData(e.currentTarget));
   let isInfoCorrect = validateInputs([email,password]);
   if(isInfoCorrect){
       let userResponse = await userOperations.loginUser({email, password});
       if(userResponse.status !== `ok`){
           return;
       }
       else{
           ctx.showNotification(`Welcome back, ${email}`);
           ctx.page.redirect('/catalog');
       };
   }
   else{
       e.target.reset();
       ctx.showNotification(`Please enter valid username and password!`);
   };
};