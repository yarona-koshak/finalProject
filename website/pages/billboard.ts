console.log("megiv");


import { Artist } from "../type";
import { send } from "../utilities";

// let loggedInDiv = document.getElementById("loggedInDiv") as HTMLDivElement;
let booksContainer = document.getElementById("booksContainer") as HTMLDivElement;


let userId = localStorage.getItem("userId");

// if (userId != null) {
//   loggedInDiv.classList.remove("hidden");
// }

generatePreviews();


async function generatePreviews() {
  let articles = await send("getArticals", []) as Artist[];
    for (let i = 0; i < articles.length; i++) {
      let previewAnchor = createPreviewAnchor(articles[i]);
      booksContainer.appendChild(previewAnchor);
    }
  }


function createPreviewAnchor(artical: Artist): HTMLAnchorElement {
  let anchor = document.createElement("a");
  anchor.classList.add("preview");
  anchor.href = "artist.html?articalId=" + artical.Id;

  let img = document.createElement("img");
  img.classList.add("bookImage");
  img.src = artical.ImageSource;
  anchor.appendChild(img);

  let titleDiv = document.createElement("div");
  titleDiv.innerText = artical.ArtistName;
  anchor.appendChild(titleDiv);

  return anchor;
}