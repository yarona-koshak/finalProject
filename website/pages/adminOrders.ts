import { AdminOrder, Artist } from "../type";
import { send } from "../utilities";

let contener=document.getElementById("contener") as HTMLDivElement;

allOrser()
async function allOrser() {
let artist= await send("getArtistNames",[]) as Artist[];
for(let a of artist){
    let order = await send("getAdminOrder", a.Id) as AdminOrder[];
 for (let o of order) {
    let card = document.createElement("div");
    contener.appendChild(card);
   let artistTeitel = document.createElement("h4");
   artistTeitel.innerText= a.ArtistName;
   let div=document.createElement("div");
   let orderName=document.createElement("samp");
   orderName.innerText=o.OrderName;
   let phone=document.createElement("samp");
   phone.innerText=o.PhoneNumber;
   let tickets=document.createElement("samp");
   tickets.innerText=o.TickNum.toString();
   div.appendChild(orderName);
   div.appendChild(phone);
   div.appendChild(tickets);
   card.appendChild(artistTeitel);
   card.appendChild(div);
  }
}
}
