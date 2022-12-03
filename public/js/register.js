







// // Dummy login

// let usernameInput = document.getElementById('email');
// let passwordInput = document.getElementById('password');
// let loginButton = document.getElementById('loginButton');
// let logoutButton = document.getElementById('logoutButton');
// let formLog = document.getElementById('loginForm');
// let welcome = document.getElementById('adminOnly');
// let fnameInput = document.getElementById('fname');
// let lnameInput = document.getElementById('lname');

// formLog.style.display = "block";
// welcome.style.display = "none";
// logoutButton.style.display = "none";
      
// function onLogin() {
//   localStorage.setItem("username", usernameInput.value);
//   localStorage.setItem("password", passwordInput.value);
//   localStorage.setItem("fname", fnameInput.value);
//   localStorage.setItem("lname", lnameInput.value);

//   if(localStorage.getItem('username') && localStorage.getItem('password') 
//   && localStorage.getItem('fname') && localStorage.getItem('lname')){
//     logoutButton.style.display = "block";
//     if(usernameInput.value == "admin" && passwordInput.value == "admin123") {
//       localStorage.setItem("role", "admin");
//       usernameInput.style.display = "none";
//       passwordInput.style.display = "none";
//       loginButton.style.display = "none";
//       formLog.style.display = "none";
//       welcome.style.display = "block";
      
      
//     }else {
//       localStorage.setItem("role", "basic");
//       usernameInput.style.display = "none";
//       passwordInput.style.display = "none";
//       loginButton.style.display = "none";
//       formLog.style.display = "none";
//       welcome.style.display = "block";
//     }
// } else{
//   localStorage.clear();
//   location.reload();
//   alert("Please fill the form completely");
// }}

// if(localStorage.getItem('username')){
//   usernameInput.style.display = "none"
//   passwordInput.style.display = "none"
//   loginButton.style.display = "none"
//   logoutButton.style.display = "block";
//   if(localStorage.getItem('role') == "admin"){
//     formLog.style.display = "none";
//     welcome.style.display = "block";
//   }else{
//     formLog.style.display = "none";
//     welcome.style.display = "block";
//   }
// }

// function onLogout() {
//   localStorage.clear();
//   location.reload();
// }

