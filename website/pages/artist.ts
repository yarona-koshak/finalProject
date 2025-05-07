import { send } from "../utilities";
import { Artist } from "../type";


let query = new URLSearchParams(location.search);

let dateHeading = document.getElementById("dateHeading") as HTMLHeadingElement;
let authorHeading = document.getElementById("authorHeading") as HTMLHeadingElement;
let coverImg = document.getElementById("coverImg") as HTMLImageElement;
let priceHeading = document.getElementById("priceHeading") as HTMLHeadingElement;
let descriptionDiv = document.getElementById("descriptionDiv") as HTMLDivElement;

let userId = localStorage.getItem("userId");
let ArtistId = Number(query.get("artistId"));

appendArtist();

async function appendArtist() {
  let [artical, Price] = await send("getArtistIdInfo", [userId, ArtistId]) as [Artist, string];

  document.title = artical.ArtistName;
  dateHeading.innerText = artical.date;
  authorHeading.innerText = artical.ArtistName;
  // priceHeading.innerText =
  coverImg.src = artical.ImageSource;
  descriptionDiv.innerText = artical.Description;
} 