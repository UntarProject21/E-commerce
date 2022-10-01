const hamburer = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

if (hamburer) {
    hamburer.addEventListener("click", () => {
    navList.classList.toggle("open");
    });
}
const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) =>{
    faq.addEventListener("click", () =>{
        faq.classList.toggle("active");
    });
});