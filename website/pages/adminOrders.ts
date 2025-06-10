import { AdminOrder, Artist } from "../type";
import { send } from "../utilities";

let place=document.getElementById("place") as HTMLDivElement;
let  seeTheOrders=document.getElementById("seeOrder") as HTMLButtonElement;
let home=document.getElementById("home") as HTMLButtonElement;
let allOrders=document.querySelector("#allOrders") as HTMLDivElement;
let isVisible = false;

seeTheOrders.addEventListener("click", () => {
    if (isVisible) {
        allOrders.innerHTML = ""; 
    } else {
        allOrser();
    }
    isVisible = !isVisible;
});

VisiblePlace();



async function allOrser() {
let artist= await send("getArtistNames",[]) as Artist[];
for(let a of artist){
     let artistId=a.Id;
    let orders = await send("getAdminOrder", artistId) as AdminOrder[];
 for (let o of orders) {
    let card = document.createElement("div");
    card.classList.add("card");
    allOrders.appendChild(card);
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

async function VisiblePlace() {
  let artist= await send("getArtistNames",[]) as Artist[];
for(let a of artist){
     let artistId=a.Id;
    let orders = await send("getAdminOrder", artistId) as AdminOrder[];
      let div=document.createElement("div");
      let artistTeitel = document.createElement("h4");
   artistTeitel.innerText= a.ArtistName;
   div.appendChild(artistTeitel);
   place.appendChild(div);
   div.classList.add("card");
  let ticket= document.createElement("div");
  let sum=0;
  for(let i=0; i< orders.length;i++){
    sum=+ orders[i].TickNum;
  }
  ticket.innerText="to this had bought "+sum+" tickets";
  console.log(ticket);
  let ststus=false;
  if(ticket.innerText<="70"){
    ststus=true;
  }
  let placetick=document.createElement("div");
  if(ststus){
    
    placetick.innerText="there are still free place";
  }
  else{
placetick.innerText="sold out";
  }
  div.appendChild(ticket);
  div.appendChild(placetick);8nn
     }
}
