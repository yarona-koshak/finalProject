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
  location.href = "/website/page/archives.html";
}

import { Artical } from "../type";

let artistName = document.getElementById("artistName") as HTMLHeadingElement;
let infourl = document.getElementById("infourl") as HTMLHeadingElement;
let videourl = document.getElementById("videourl") as HTMLHeadingElement;
let artistsContainer=document.querySelector("artistsContainer")as HTMLDivElement;

appendArtist();

async function appendArtist() {

  let artical = await send("getArticalInfo",[]) as Artical[];

  for (let i = 0; i < artical.length; i++) {
     console.log(artical);
      // let previewAnchor = createPreviewAnchor(artical[i]);
      // artistsContainer.appendChild(previewAnchor);
    }
  // artistName.innerText = artical.ArtistName;
  // infourl.innerText = artical.InfoURL;
  // videourl.innerText=artical.VideoURL;
} 

function createPreviewAnchor(artical: Artical): HTMLAnchorElement {
  let anchor = document.createElement("a");
  anchor.classList.add("preview");
  anchor.href = "artist.html?artistId=" + artist.Id;

  let img = document.createElement("img");
  img.classList.add("bookImage");
  img.src = artist.ImageSource;
  anchor.appendChild(img);

  let titleDiv = document.createElement("div");
  titleDiv.innerText = artist.ArtistName;
  anchor.appendChild(titleDiv);

  return anchor;
}