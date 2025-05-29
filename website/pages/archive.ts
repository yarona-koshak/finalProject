import { send } from "../utilities";

let button = document.querySelector("#button") as HTMLButtonElement;
let infoShow = document.querySelector(".hidden") as HTMLDivElement;
button.addEventListener("click", () => {
  infoShow.classList.toggle("hidden");
});

let submit=document.querySelector("#submit") as HTMLButtonElement;
let aName= document.getElementById("aName") as HTMLInputElement;
let aURL= document.getElementById("aURL") as HTMLInputElement;
let vURL= document.getElementById("vURL") as HTMLInputElement;

submit.onclick = async function () {
 
  await send(
    "addArtical",
    [
      aName.value,
      aURL.value,
      vURL.value,
    ]
  );
  location.href = "archive.html";
}

import { Artical } from "../type";

let artistName = document.getElementById("artistName") as HTMLHeadingElement;
let infourl = document.getElementById("infourl") as HTMLHeadingElement;
let videourl = document.getElementById("videourl") as HTMLHeadingElement;


appendArtist();

async function appendArtist() {

  let artical = await send("getArtialInfo",[]) as Artical[];

  artistName.innerText = artical[].ArtistName;
  infourl.innerText = artical.InfoURL;
  videourl.innerText=artical.VideoURL;
} 