import { send } from "../utilities";
import { Artical, Artist, Order } from "../type";

let button = document.querySelector("#button") as HTMLButtonElement;
let formBox = document.querySelector(".formBox") as HTMLDivElement;
let submit = document.getElementById("submit") as HTMLButtonElement;
let home=document.getElementById("home")as HTMLButtonElement;
let orderTiltel=document.querySelector("#orderTiltel") as HTMLHeadingElement;
let aName = document.getElementById("aName") as HTMLInputElement;
let aURL = document.getElementById("aURL") as HTMLInputElement;
let vURL = document.getElementById("vURL") as HTMLInputElement;
let artistsContainer = document.querySelector("#artistsContainer") as HTMLDivElement;
let myOrder=document.getElementById("myOrder") as HTMLDivElement;
let greetingDiv = document.getElementById("greetingDiv") as HTMLDivElement;
let adminnbut=document.getElementById("adminbut")as HTMLButtonElement;
let admindiv=document.getElementById("admindiv") as HTMLDivElement;
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
  orderTiltel.classList.remove("hidden");

} else {
  localStorage.removeItem("userId");
}
let userAdmin = localStorage.getItem("userId");
if (userAdmin === "admin") {
  button.classList.remove("hidden");
  home.classList.add("hidden");
  admindiv.classList.remove("hidden");
  
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



getMyOrder()
async function getMyOrder() {
let order = await send("getAnOrder", userId) as Order[];

 for (let o of order) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("remove");
    myOrder.appendChild(card);

    let cardTable = document.createElement("div");
    card.appendChild(cardTable);

    let nameTr = document.createElement("div");
    cardTable.appendChild(nameTr);
    let ArtistId=o.ArtistId as number;
     let artistName = await send("getArtistInfo",[userId,ArtistId]) as Artist;
    let artist= document.createElement("h3");
    artist.innerText = artistName.ArtistName; 
    nameTr.appendChild(artist);
    let quantity= document.createElement("h4");
    quantity.innerText = "your tickets number :"+o.TickNum.toString();
    nameTr.appendChild(quantity);
    
      let removeOrder = document.createElement("button");
  removeOrder.innerText = "Unbook";
  removeOrder.onclick = function () {
    send("removeOrder", [o.UserId,o.ArtistId]);
    card.remove();
  };
card.appendChild(removeOrder);
  }
}

adminnbut.onclick=function(){
  window.location.href = "/website/pages/adminOrders.html";
}