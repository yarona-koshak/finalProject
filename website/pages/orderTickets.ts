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

let confettiContainer = document.getElementById("confetti-container") as HTMLDivElement;
let nameInput= document.getElementById("name") as HTMLInputElement;
orderBtn.onclick = function() {
  if (nameInput.value != ""){
  if (confirm("Do you want to order")) {
      order();
  box.classList.add('box2');
    triggerConfettiEffect();
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
  console.log( typeof selectedArtist?.Id);
  console.log( typeof userId);
  console.log(typeof quantity.value);

 await send(
    "makeAnOrder",
    [
       userId,
       selectedArtist?.Id,
      parseInt(quantity.value)
    ]
  )
}



function triggerConfettiEffect() {
  let i = 0;
  while (i < 40) {
    let confetti = document.createElement("div");
    confetti.classList.add("confetti");

    let colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    let colorIndex = Math.floor(Math.random() * colors.length);
    confetti.style.backgroundColor = colors[colorIndex];

    let left = Math.random() * window.innerWidth;
    confetti.style.left = left + "px";

    let size = 6 + Math.random() * 12;
    confetti.style.width = size + "px";
    confetti.style.height = size + "px";

    confettiContainer.appendChild(confetti);

    setTimeout(function () {
      if (confettiContainer.contains(confetti)) {
        confettiContainer.removeChild(confetti);
      }
    }, 2000);

    i++;
  }
}











