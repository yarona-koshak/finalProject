import { send } from "../utilities";

let artistInput = document.getElementById("artistInput") as HTMLInputElement;
let dateInput = document.getElementById("dateInput") as HTMLInputElement;
let imageSourceInput = document.getElementById("imageSourceInput") as HTMLInputElement;
let descriptionTextarea = document.getElementById("descriptionTextarea") as HTMLTextAreaElement;
let priceInput= document.querySelector("#priceInput") as HTMLInputElement
let addButton = document.getElementById("addButton") as HTMLButtonElement;

addButton.onclick = async function () {
  await send(
    "addArtist",
    [
        artistInput.value,
        dateInput.value,
      imageSourceInput.value,
      descriptionTextarea.value,
      priceInput.value,
    ]
  );
  location.href = "billboard.html";
}