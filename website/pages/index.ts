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

// login:
let toSignUpPage = document.querySelector("#signUp") as HTMLButtonElement;
let toLoginPage= document.querySelector("#login") as HTMLButtonElement;
toLoginPage.onclick = function () {
    window.location.href = "/website/pages/login.html";
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
        window.location.href = "/website/pages/orderTickets.html";
    } 
};

tobillboardPage.onclick = function () {
    window.location.href = "/website/pages/billboard.html";
};
toarchivesPage.onclick = function () {
    window.location.href = "/website/pages/archives.html";
}

let logout = document.getElementById("logout") as HTMLButtonElement;
let usernameDiv = document.querySelector("#usernameDiv") as HTMLDivElement;
let userId = localStorage.getItem("userId");
console.log(userId);
let userExists = false;
if (userId != null) {
  userExists = await send("userExists", userId) as boolean;
}

console.log(userExists);

if (userExists) {
  usernameDiv.style.display = "block";


  let username = await send("getUsername", userId)
  usernameDiv.innerText = "Logged In as " + username;
}

logout.onclick = function () {
    localStorage.removeItem("userId");
    alert("you did logout");
    location.href = "index.html";
  }