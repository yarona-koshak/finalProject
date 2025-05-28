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
  location.href = "billboard.html";
}

import { Artical } from "../type";

let artistName = document.getElementById("artistName") as HTMLHeadingElement;
let infourl = document.getElementById("infourl") as HTMLHeadingElement;
let videourl = document.getElementById("videourl") as HTMLHeadingElement;


appendArtist();

async function appendArtist() {

  let artical = await send("getArtistInfo", [userId, ArtistId]) as Artical;

  document.title = artical.ArtistName;
  dateHeading.innerText = artical.date;
  authorHeading.innerText = artical.ArtistName;
  if (artical.Price != null) {
    priceHeading.innerText = artical.Price.toString() + "₪";
  }
  coverImg.src = artical.ImageSource;
  descriptionDiv.innerText = artical.Description;
} 