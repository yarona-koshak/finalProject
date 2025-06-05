import { Artist } from "../type";
import { send } from "../utilities";

let orderBtn = document.getElementById("orderBtn") as HTMLButtonElement;
let box = document.querySelector(".box") as HTMLDivElement;
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
let nameInput= document.getElementById("name") as HTMLInputElement;
orderBtn.onclick = function() {
  if (nameInput.value != ""){
  if (confirm("Do you want to order")) {
      order();
  box.classList.add('box2');

  box.addEventListener('transitionend', () => {
    setTimeout(() => {
      alert("Congratulations!");
      window.location.href = "/website/pages/archives.html";
    }, 3000);
  }, { once: true });
}
  } 
else {
  if(nameInput.value==""){
    alert("you can not order");
  }
   window.location.href = "/website/pages/orderTickets.html";
}
}
let quantity= document.getElementById("quantity")as HTMLInputElement;
let userId = localStorage.getItem("userId");

async function order() {
   let selectedName = select.value;
  let selectedArtist = artistName.find(artist => artist.ArtistName === selectedName) ;
 await send(
    "makeAnOrder",
    [
       userId,
      quantity.value,
    selectedArtist?.Id
    ]
  )
}














