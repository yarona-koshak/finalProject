import { send } from "../utilities";

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



toOrderTicketsPage.onclick = function () {
      if (leanguageChooise.value.toString() === optru.value.toString()) {
        window.location.href = "/website/pages/orderTicketsru.html";
    }
    else{
        console.log(leanguageChooise);
        window.location.href = "/website/pages/order_tickets.html";
    } 
};

tobillboardPage.onclick = function () {
    window.location.href = "/website/pages/billboard.html";
};
toarchivesPage.onclick = function () {
    window.location.href = "/website/pages/archives.html";
};
// 
let loggedOutDiv = document.getElementById("loggedOutDiv") as HTMLDivElement;
let logInButton = document.getElementById("logInButton") as HTMLButtonElement;
let signUpButton = document.getElementById("signUpButton") as HTMLButtonElement;
let loggedInDiv = document.getElementById("loggedInDiv") as HTMLDivElement;
let greetingDiv = document.getElementById("greetingDiv") as HTMLDivElement;
let logOutButton = document.getElementById("logOutButton") as HTMLButtonElement;
let userId = localStorage.getItem("userId");

let username = await send("getUsername", userId) as string | null;

if (username != null) {
  greetingDiv.innerText = "Welcome, " + username + "!";
  loggedInDiv.classList.remove("hidden");
} else {
  let userIdExists = localStorage.getItem("userId") != null;
  localStorage.removeItem("userId");
  loggedOutDiv.classList.remove("hidden");

  if (userIdExists) {
    top!.location.reload();
  }
}