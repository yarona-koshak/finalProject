
let userName = document.querySelector("#username")! as HTMLInputElement;
let password = document.querySelector("#password")! as HTMLInputElement;
let continuebutton=document.querySelector("#continuebutton") as HTMLButtonElement;
continuebutton.onclick=function(){
    let passwordcheck = prompt("Please enter your password again:");
    if (passwordcheck==password.value){
        alert("great");
    window.location.href = "/website/pages/index.html";
    }
    else{
        alert("Passwords Do Not Match"); 
    }
}
