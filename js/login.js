const hamburer = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

if (hamburer) {
  hamburer.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}

// Dummy login

let usernameInput = document.getElementById('email');
let passwordInput = document.getElementById('password');
let loginButton = document.getElementById('loginButton');
let logoutButton = document.getElementById('logoutButton');
let formLog = document.getElementById('loginForm');
let welcome = document.getElementById('adminOnly');

formLog.style.display = "block";
welcome.style.display = "none";
logoutButton.style.display = "none";

function onLogin() {
  localStorage.setItem("username", usernameInput.value);
  localStorage.setItem("password", passwordInput.value);
  if(localStorage.getItem('username') && localStorage.getItem('password')){
    logoutButton.style.display = "block";
    if(usernameInput.value == "admin" && passwordInput.value == "admin123") {
      localStorage.setItem("role", "admin");
      usernameInput.style.display = "none";
      passwordInput.style.display = "none";
      loginButton.style.display = "none";
      formLog.style.display = "none";
      welcome.style.display = "block";
    }else {
      localStorage.setItem("role", "basic");
      usernameInput.style.display = "none";
      passwordInput.style.display = "none";
      loginButton.style.display = "none";
      formLog.style.display = "none";
    }
} else{
  localStorage.clear();
  location.reload();
  alert("Please enter a username and password");
}}

if(localStorage.getItem('username')){
  usernameInput.style.display = "none"
  passwordInput.style.display = "none"
  loginButton.style.display = "none"
  logoutButton.style.display = "block";
  if(localStorage.getItem('role') == "admin"){
    formLog.style.display = "none";
    welcome.style.display = "block";
  }else{
    formLog.style.display = "none";
    welcome.style.display = "none";
  }
}

function onLogout() {
  localStorage.clear();
  location.reload();
}
