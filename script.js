window.addEventListener("load", () => {

  /* ================= HAMBURGER MENU ================= */
  const burger = document.querySelector(".burger");
  const nav = document.querySelector("header nav");

  if(burger){
    burger.addEventListener("click", () => {
      nav.style.display = nav.style.display === "flex" ? "none" : "flex";
    });
  }

  /* ================= HERO SLIDER ================= */
 (function () {
  let slides, dots, prev, next;
  let currentSlide = 0;
  let autoSlide;

  function initHeroSlider() {
    slides = document.querySelectorAll(".slide");
    dots = document.querySelectorAll(".dot");
    prev = document.querySelector(".prev");
    next = document.querySelector(".next");

    if (!slides.length) {
      console.error("❌ Hero slides not found");
      return;
    }

    showSlide(currentSlide);
    startAutoSlide();

    next.addEventListener("click", () => {
      goNext();
      restartAutoSlide();
    });

    prev.addEventListener("click", () => {
      goPrev();
      restartAutoSlide();
    });

    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        currentSlide = Number(dot.dataset.index);
        showSlide(currentSlide);
        restartAutoSlide();
      });
    });
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      dots[i].classList.toggle("active", i === index);
    });
  }

  function goNext() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function goPrev() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  function startAutoSlide() {
    autoSlide = setInterval(goNext, 4000);
  }

  function restartAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  /* GUARANTEED DOM READY */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeroSlider);
  } else {
    initHeroSlider();
  }
})();

  /* ================= BOOKING FORM ================= */
  const bookingForm = document.getElementById("bookingForm");
  const confirmationPopup = document.getElementById("confirmationPopup");

  if(bookingForm){
    bookingForm.addEventListener("submit", function(e){
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const service = document.getElementById("service").value;
      const message = document.getElementById("message").value.trim();

      if(name && phone && service){
        const whatsappMessage = `Hello, my name is ${name}. I would like to book: ${service}. Message: ${message}`;
        const whatsappURL = `https://wa.me/254704222666?text=${encodeURIComponent(whatsappMessage)}`;
        
        confirmationPopup.style.display = "block";
        setTimeout(() => {
          confirmationPopup.style.display = "none";
          window.open(whatsappURL, "_blank");
          bookingForm.reset();
        }, 2000);
      }
    });
  }

  /* ================= COPY PAYMENT INFO ================= */
  window.copyText = function(text){
    navigator.clipboard.writeText(text).then(() => {
      alert(`Copied: ${text}`);
    }).catch(() => { alert("Failed to copy"); });
  }

  /* ================= REVIEWS ================= */
  const reviews = document.querySelectorAll(".review");
  let currentReview = 0;

  if(reviews.length){
    function showReview(index){
      reviews.forEach(r => r.classList.remove("active"));
      reviews[index].classList.add("active");
    }

    setInterval(() => {
      currentReview = (currentReview + 1) % reviews.length;
      showReview(currentReview);
    }, 5000);
  }

  /* ================= SMOOTH SCROLL ================= */
  document.querySelectorAll('header nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      if(this.getAttribute("href").startsWith("#")){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        target.scrollIntoView({ behavior: 'smooth' });
        if(window.innerWidth <= 768) nav.style.display = "none";
      }
    });
  });

});



