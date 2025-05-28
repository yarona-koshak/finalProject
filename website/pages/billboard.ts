console.log("megiv");


import { Artist } from "../type";
import { send } from "../utilities";

// let loggedInDiv = document.getElementById("loggedInDiv") as HTMLDivElement;
let artistsContainer = document.getElementById("artistsContainer") as HTMLDivElement;


let userId = localStorage.getItem("userId");

// if (userId != null) {
//   loggedInDiv.classList.remove("hidden");
// }

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
  anchor.href = "artist.html?articalId=" + artist.Id;

  let img = document.createElement("img");
  img.classList.add("bookImage");
  img.src = artist.ImageSource;
  anchor.appendChild(img);

  let titleDiv = document.createElement("div");
  titleDiv.innerText = artist.ArtistName;
  anchor.appendChild(titleDiv);

  return anchor;
}