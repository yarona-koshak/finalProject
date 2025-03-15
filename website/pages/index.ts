let toSignUpPage = document.querySelector("#signUp") as HTMLButtonElement;
let toLoginPage= document.querySelector("#login") as HTMLButtonElement;
toLoginPage.onclick = function () {
    window.location.href = "/website/pages/login.html";
};
toSignUpPage.onclick = function () {
    window.location.href = "/website/pages/signUp.html";
};