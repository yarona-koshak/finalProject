import { send } from "../utilities";
import { Artical } from "../type";

let button = document.querySelector("#button") as HTMLButtonElement;
let formBox = document.querySelector(".formBox") as HTMLDivElement;
let submit = document.getElementById("submit") as HTMLButtonElement;

let aName = document.getElementById("aName") as HTMLInputElement;
let aURL = document.getElementById("aURL") as HTMLInputElement;
let vURL = document.getElementById("vURL") as HTMLInputElement;
let artistsContainer = document.querySelector("#artistsContainer") as HTMLDivElement;


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