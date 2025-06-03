
import { Artist } from "../type";
import { send } from "../utilities";

let button = document.querySelector("#button") as HTMLButtonElement;
let artistsContainer = document.getElementById("artistsContainer") as HTMLDivElement;


let userAdmin = localStorage.getItem("userId");
if (userAdmin === "admin") {
  button.classList.remove("hidden");
}


generatePreviews();


async function generatePreviews() {
  let articles = await send("getArtist", []) as Artist[];
    for (let i = 0; i < articles.length; i++) {
      let previewAnchor = createPreviewAnchor(articles[i]);
      artistsContainer.appendChild(previewAnchor);
    }
  }


function createPreviewAnchor(artist: Artist): HTMLAnchorElement {
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