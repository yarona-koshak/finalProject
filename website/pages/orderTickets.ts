import { Artist } from "../type";
import { send } from "../utilities";

let orderBtn = document.getElementById("orderBtn") as HTMLButtonElement;
let box = document.querySelector(".box") as HTMLDivElement;

orderBtn.onclick = function() {
  box.classList.add('box2');

  box.addEventListener('transitionend', () => {
    setTimeout(() => {
      alert("Congratulations!");
      window.location.href = "/website/pages/index.html";
    }, 3000);
  }, { once: true });
};

let select=document.querySelector("#select") as HTMLSelectElement;
let artistName = await send("getArtistNames", []) as Artist[];
 for (let i = 0; i < artistName.length; i++) {
      let option= document.createElement("option");
      option.innerText= artistName[i].ArtistName;
      select.appendChild(option);
    }


select.addEventListener("change", () => {
  let selectedName = select.value;
  let selectedArtist = artistName.find(artist => artist.ArtistName === selectedName);
  let artistinfodiv=document.querySelector("#artistinfodiv") as HTMLDivElement;
  if (selectedArtist) {
    artistinfodiv.innerHTML = `
      <h2>${selectedArtist.ArtistName}</h2>
      <p>${selectedArtist.Date}</p>
      ${selectedArtist.Price}
    `;
    artistinfodiv.style.display = "block";
  } else {
    artistinfodiv.innerHTML = "";
    artistinfodiv.style.display = "none";
  }
});

















// let test= document.getElementById("test") as HTMLButtonElement;
// test.onclick=function(){

// if (confirm("האם להמשיך?")) {
//   // המשתמש לחץ OK
//   alert("המשכת");
// } else {
//   // המשתמש לחץ Cancel
//   alert("בוטל");
// }
  
// }