import { send } from "../utilities";

let button = document.querySelector("#button") as HTMLButtonElement;
let infoShow = document.querySelector(".hidden") as HTMLDivElement;
button.addEventListener("click", () => {
  infoShow.classList.toggle("hidden");
});

let submit = document.querySelector("#submit") as HTMLButtonElement;
let aName = document.getElementById("aName") as HTMLInputElement;
let aURL = document.getElementById("aURL") as HTMLInputElement;
let vURL = document.getElementById("vURL") as HTMLInputElement;

submit.onclick = async function () {

  await send(
    "addArtical",
    [
      aName.value,
      aURL.value,
      vURL.value,
    ]
  );
  location.href = "/website/pages/archives.html";
}

import { Artical } from "../type";

// let artistName = document.getElementById("artistName") as HTMLHeadingElement;
// let infourl = document.getElementById("infourl") as HTMLHeadingElement;
// let videourl = document.getElementById("videourl") as HTMLHeadingElement;
let artistsContainer = document.querySelector("#artistsContainer") as HTMLDivElement;

appendArtist();

async function appendArtist() {

  let artical = await send("getArticalInfo", []) as Artical[];
  console.log(artical);
  for (let i = 0; i < artical.length; i++) {

    let card = document.createElement("div");
    card.classList.add("card");
    artistsContainer.appendChild(card);

    let cardTable = document.createElement("table");
    card.appendChild(cardTable);

    let nameTr = document.createElement("tr");
    cardTable.appendChild(nameTr)

    let nameTitleTd = document.createElement("td");
    nameTitleTd.innerText = "Name: ";
    nameTr.appendChild(nameTitleTd);

    let nameTd = document.createElement("td");
    nameTd.innerText = artical[i].Artist_name;
    nameTr.appendChild(nameTd);

    let InfoURLTr = document.createElement("tr");
    cardTable.appendChild(InfoURLTr)

    let infoTitleTd = document.createElement("td");
    infoTitleTd.innerText = "Info: ";
    InfoURLTr.appendChild(infoTitleTd);

    let infourl = document.createElement("a");
   infourl.innerText = artical[i].InfoURL;
    infourl.href = artical[i].InfoURL;
   infourl.target = "_blank"; // פותח בטאב חדש
    InfoURLTr.appendChild(infourl);

    let VideoURLTr = document.createElement("tr");
    cardTable.appendChild(VideoURLTr)

    let videoTitleTd = document.createElement("td");
    videoTitleTd.innerText = "Video: ";
    VideoURLTr.appendChild(videoTitleTd);

    let videoTd = document.createElement("a");
    videoTd.innerText = artical[i].VideoURL;
    videoTd.href = artical[i].VideoURL;
    videoTd.target = "_blank";
    VideoURLTr.appendChild(videoTd);

  }
}

