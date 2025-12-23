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
  window.addEventListener("load", () => {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");

  let current = 0;
  let timer;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      dots[i].classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }

  next.addEventListener("click", () => {
    nextSlide();
    resetTimer();
  });

  prev.addEventListener("click", () => {
    prevSlide();
    resetTimer();
  });

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      current = parseInt(dot.dataset.index);
      showSlide(current);
      resetTimer();
    });
  });

  function startTimer() {
    timer = setInterval(nextSlide, 5000);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  showSlide(current);
  startTimer();
});

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

