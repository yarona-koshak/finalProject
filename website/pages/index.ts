// עברה לעמודים אחרים באמצעות כפתורים

// login , sign up:
let toSignUpPage = document.querySelector("#signUp") as HTMLButtonElement;
let toLoginPage= document.querySelector("#login") as HTMLButtonElement;
toLoginPage.onclick = function () {
    window.location.href = "/website/pages/login.html";
};
toSignUpPage.onclick = function () {
    window.location.href = "/website/pages/signUp.html";
};

// archives , billboard , order_tickets:
let tobillboardPage = document.querySelector("#billboard") as HTMLButtonElement;
let toOrderTicketsPage= document.querySelector("#orderTickets") as HTMLButtonElement;
let toarchivesPage= document.querySelector("#archives") as HTMLButtonElement;
toarchivesPage.onclick = function () {
    window.location.href = "/website/pages/archives.html";
};
toOrderTicketsPage.onclick = function () {
    window.location.href = "/website/pages/order_tickets.html";
};
tobillboardPage.onclick = function () {
    window.location.href = "/website/pages/billboard.html";
};


// בחירת שפה ועברה לעמוד מתאים לפי השפה 
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