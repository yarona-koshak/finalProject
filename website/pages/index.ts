import { send } from "../utilities";

// עברה לעמודים אחרים באמצעות כפתורים

// login:
let toSignUpPage = document.querySelector("#signUp") as HTMLButtonElement;
let toLoginPage= document.querySelector("#login") as HTMLButtonElement;
toLoginPage.onclick = function () {
    window.location.href = "/website/pages/login.html";
};
toSignUpPage.onclick = function () {
    window.location.href = "/website/pages/signup.html";
};

// archives , billboard , order_tickets:
let tobillboardPage = document.querySelector("#billboard") as HTMLButtonElement;
let toOrderTicketsPage= document.querySelector("#orderTickets") as HTMLButtonElement;
let toarchivesPage= document.querySelector("#archives") as HTMLButtonElement;



toOrderTicketsPage.onclick = function () {
  
        window.location.href = "/website/pages/orderTickets.html";
}
tobillboardPage.onclick = function () {
    window.location.href = "/website/pages/billboard.html";
};
toarchivesPage.onclick = function () {
    window.location.href = "/website/pages/archives.html";
}

let logout = document.getElementById("logout") as HTMLButtonElement;
let usernameDiv = document.querySelector("#usernameDiv") as HTMLDivElement;
let loggedOutDiv=document.getElementById("loggedOutDiv") as HTMLDivElement;
async function getUserId() {
  let userId = localStorage.getItem("userId");

  if (userId == null) {
    return null;
  }

  let varified = await send("verifyUserId", userId);

  if (!varified) {
    localStorage.removeItem("userId");
    return null;
  }

  return userId;
}
let userId = await getUserId();
console.log(userId);
if (userId != null) {
loggedOutDiv.classList.remove("hidden");
  let username = await send("getUsername", userId) as string;
  usernameDiv.innerText = "Welcome, " + username + "!";

} else {
  localStorage.removeItem("userId");
}

logout.onclick = function () {
    localStorage.removeItem("userId)");
       loggedOutDiv.classList.add("hidden");
    alert("you did logout");
    location.href = "index.html";
 

  }