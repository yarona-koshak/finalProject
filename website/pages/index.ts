let toSignUpPage = document.querySelector("#signUp") as HTMLButtonElement;
let toLoginPage= document.querySelector("#login") as HTMLButtonElement;
toLoginPage.onclick = function () {
    window.location.href = "/website/pages/login.html";
};
toSignUpPage.onclick = function () {
    window.location.href = "/website/pages/signUp.html";
};
// עברת עמודים של login and sign up 
let leanguageChooise= document.getElementById("leanguageChooise") as HTMLSelectElement;
let opteng= document.getElementById("opteng") as HTMLOptionElement;
let optru= document.getElementById("optru") as HTMLOptionElement;

leanguageChooise.onchange=function(){
    if (leanguageChooise.value.toString() === optru.value.toString()) {
        window.location.href = "/website/pages/indexru.html";
    }
    else{
        window.location.href = "/website/pages/index.html";
    }
}