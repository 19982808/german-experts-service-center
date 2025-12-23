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
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".hero button.prev");
  const nextBtn = document.querySelector(".hero button.next");
  const dots = document.querySelectorAll(".dot");
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index){
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      dots[i].classList.remove("active");
    });
    slides[index].classList.add("active");
    dots[index].classList.add("active");
  }

  function nextSlide(){
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide(){
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  if(prevBtn && nextBtn){
    prevBtn.addEventListener("click", () => { prevSlide(); resetInterval(); });
    nextBtn.addEventListener("click", () => { nextSlide(); resetInterval(); });
  }

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      currentSlide = parseInt(dot.getAttribute("data-index"));
      showSlide(currentSlide);
      resetInterval();
    });
  });

  function startInterval(){
    slideInterval = setInterval(nextSlide, 5000);
  }

  function resetInterval(){
    clearInterval(slideInterval);
    startInterval();
  }

  showSlide(currentSlide);
  startInterval();

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
