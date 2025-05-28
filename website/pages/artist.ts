import { send } from "../utilities";
import { Artist } from "../type";


let query = new URLSearchParams(location.search);

let dateHeading = document.getElementById("dateHeading") as HTMLHeadingElement;
let authorHeading = document.getElementById("authorHeading") as HTMLHeadingElement;
let coverImg = document.getElementById("coverImg") as HTMLImageElement;
let priceHeading = document.getElementById("priceHeading") as HTMLHeadingElement;
let descriptionDiv = document.getElementById("descriptionDiv") as HTMLDivElement;

let userId = localStorage.getItem("userId");
let ArtistId = parseInt(query.get("articalId")!);

appendArtist();

async function appendArtist() {
  console.log(userId, ArtistId);

  let artical = await send("getArtistInfo", [userId, ArtistId]) as Artist;

  document.title = artical.ArtistName;
  dateHeading.innerText = artical.date;
  authorHeading.innerText = artical.ArtistName;
  if (artical.Price != null) {
    priceHeading.innerText = artical.Price.toString() + "₪";
  }
  coverImg.src = artical.ImageSource;
  descriptionDiv.innerText = artical.Description;
} 
const checkbox = document.getElementById("agree") as HTMLInputElement;

checkbox.onchange = function() {
  if (checkbox.checked) {
    window.location.href = "/website/pages/orderTickets.html";
  }
};
