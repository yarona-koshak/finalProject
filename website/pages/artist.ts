import { send } from "../utilities";
import { Artist } from "../type";


let query = new URLSearchParams(location.search);

let dateHeading = document.getElementById("dateHeading") as HTMLHeadingElement;
let authorHeading = document.getElementById("authorHeading") as HTMLHeadingElement;
let coverImg = document.getElementById("coverImg") as HTMLImageElement;
let priceHeading = document.getElementById("priceHeading") as HTMLHeadingElement;
let descriptionDiv = document.getElementById("descriptionDiv") as HTMLDivElement;

let userId = localStorage.getItem("userId");
let ArtistId = parseInt(query.get("artistId")!);

appendArtist();

async function appendArtist() {
  console.log(userId, ArtistId);

  let artist = await send("getArtistInfo", [userId, ArtistId]) as Artist;

  document.title = artist.ArtistName;
  dateHeading.innerText = artist.date;
  authorHeading.innerText = artist.ArtistName;
  if (artist.Price != null) {
    priceHeading.innerText = artist.Price.toString() + "₪";
  }
  coverImg.src = artist.ImageSource;
  descriptionDiv.innerText = artist.Description;
} 
let checkbox = document.getElementById("agree") as HTMLInputElement;

checkbox.onchange = function() {
  if (checkbox.checked) {
    window.location.href = "/website/pages/orderTickets.html";
  }
};
