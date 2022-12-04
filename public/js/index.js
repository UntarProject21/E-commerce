// // Popup
// const popup = document.querySelector(".popup");
// const closePopup = document.querySelector(".popup-close");

// if (popup) {
//   closePopup.addEventListener("click", () => {
//     popup.classList.add("hide-popup");
//   });

//   window.addEventListener("load", () => {
//     setTimeout(() => {
//       popup.classList.remove("hide-popup");
//     }, 1000);
//   });
// }
// preloader
window.onload = function(){ 
  document.querySelector(".preloader").style.display = "none"; 
}

//back to top
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
