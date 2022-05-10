 function getToken(){
    let user = JSON.parse(localStorage.getItem(`user`));
    return user.accessToken;
};

function getUser(){
    let userSerialized = localStorage.getItem(`user`);
   let user = JSON.parse(userSerialized);
    return user;
};

function saveUser(user){
   localStorage.setItem(`user`, JSON.stringify(user));
};

function clearStorage(){
    localStorage.clear();
};

export const authOperations = {
    getToken,
    saveUser,
    getUser,
    clearStorage,
};