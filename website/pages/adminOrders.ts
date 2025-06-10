import { AdminOrder, Artist } from "../type";
import { send } from "../utilities";

let contener=document.getElementById("contener") as HTMLDivElement;
let  seeTheOrders=document.getElementById("seeOrder") as HTMLButtonElement;
let home=document.getElementById("home") as HTMLButtonElement;
seeTheOrders.addEventListener("click", () => {
    allOrser();
});


async function allOrser() {
let artist= await send("getArtistNames",[]) as Artist[];
for(let a of artist){
     let artistId=a.Id;
    let orders = await send("getAdminOrder", artistId) as AdminOrder[];
 for (let o of orders) {
    let card = document.createElement("div");
    card.classList.add("card");
    contener.appendChild(card);
   let artistTeitel = document.createElement("h4");
   artistTeitel.innerText= a.ArtistName;
   let div=document.createElement("ul");
   let orderName=document.createElement("li");
   orderName.innerText=o.OrderName;
   let phone=document.createElement("li");
   phone.innerText=o.PhoneNumber;
   let tickets=document.createElement("li");
   tickets.innerText=o.TickNum.toString();
   div.appendChild(orderName);
   div.appendChild(phone);
   div.appendChild(tickets);
   card.appendChild(artistTeitel);
   card.appendChild(div);
  }
 
}
}
home.onclick=function(){
  window.location.href = "/website/pages/index.html";

}