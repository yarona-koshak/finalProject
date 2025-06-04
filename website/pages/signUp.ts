import { send } from "../utilities";

let usernameInput = document.getElementById("usernameInput") as HTMLInputElement;
let passwordInput = document.getElementById("passwordInput") as HTMLInputElement;
let submitButton = document.getElementById("submitButton") as HTMLButtonElement;
let messageDiv = document.getElementById("messageDiv") as HTMLDivElement;
let confettiContainer = document.getElementById("confetti-container") as HTMLDivElement;

submitButton.onclick = async function () {
  let userId = await send("signUp", [
    usernameInput.value,
    passwordInput.value,
  ]) as string | null;

  if (userId != null) {
    localStorage.setItem("userId", userId);
    triggerConfettiEffect();
  } else {
    messageDiv.innerText = "Username is already taken";
  }
};

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


  setTimeout(function () {
    location.href = "index.html";
  }, 4000);
}
