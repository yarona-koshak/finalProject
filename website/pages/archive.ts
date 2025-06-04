import { send } from "../utilities";
import { Artical } from "../type";

let button = document.querySelector("#button") as HTMLButtonElement;
let formBox = document.querySelector(".formBox") as HTMLDivElement;
let submit = document.getElementById("submit") as HTMLButtonElement;
let home=document.getElementById("home")as HTMLButtonElement;

let aName = document.getElementById("aName") as HTMLInputElement;
let aURL = document.getElementById("aURL") as HTMLInputElement;
let vURL = document.getElementById("vURL") as HTMLInputElement;
let artistsContainer = document.querySelector("#artistsContainer") as HTMLDivElement;


let greetingDiv = document.getElementById("greetingDiv") as HTMLDivElement;

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
  let username = await send("getUsername", userId) as string;
  greetingDiv.innerText = "Welcome, " + username + "!";
  home.classList.remove("hidden");
} else {
  localStorage.removeItem("userId");
}
let userAdmin = localStorage.getItem("userId");
if (userAdmin === "admin") {
  button.classList.remove("hidden");
  home.classList.add("hidden");
}

home.onclick=function(){
  window.location.href = "/website/pages/index.html";

}

button.addEventListener("click", () => {
  formBox.classList.remove("hidden");
  button.classList.add("hidden");
});


submit.addEventListener("click", async () => {
  await send("addArtical", [
    aName.value,
    aURL.value,
    vURL.value
  ]);

  formBox.classList.add("hidden");
  button.classList.remove("hidden");

});

appendArtist();

async function appendArtist() {
  let artical = await send("getArticalInfo", []) as Artical[];

  for (let a of artical) {
    let card = document.createElement("div");
    card.classList.add("card");
    artistsContainer.appendChild(card);

    let cardTable = document.createElement("table");
    card.appendChild(cardTable);

    let nameTr = document.createElement("tr");
    cardTable.appendChild(nameTr);

    let nameTitleTd = document.createElement("td");
    nameTitleTd.innerText = "Name: ";
    nameTr.appendChild(nameTitleTd);

    let nameTd = document.createElement("td");
    nameTd.innerText = a.Artist_name;
    nameTr.appendChild(nameTd);

    let infoTr = document.createElement("tr");
    cardTable.appendChild(infoTr);

    let infoTitleTd = document.createElement("td");
    infoTitleTd.innerText = "Info: ";
    infoTr.appendChild(infoTitleTd);

    let infourl = document.createElement("a");
    infourl.innerText = a.InfoURL;
    infourl.href = a.InfoURL;
    infourl.target = "_blank";
    infoTr.appendChild(infourl);

    let videoTr = document.createElement("tr");
    cardTable.appendChild(videoTr);

    let videoTitleTd = document.createElement("td");
    videoTitleTd.innerText = "Video: ";
    videoTr.appendChild(videoTitleTd);

    let videoTd = document.createElement("a");
    videoTd.innerText = a.VideoURL;
    videoTd.href = a.VideoURL;
    videoTd.target = "_blank";
    videoTr.appendChild(videoTd);
  }
}