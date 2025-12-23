/* ================= HERO SLIDER ================= */
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index){
  if (!slides[index]) return;
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

document.querySelector('.next')?.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

document.querySelector('.prev')?.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    currentSlide = parseInt(dot.dataset.index);
    showSlide(currentSlide);
  });
});

// Auto-slide
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000);

// Touch support
let startX = 0;
let endX = 0;
const heroSection = document.querySelector('.hero');

heroSection.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

heroSection.addEventListener('touchend', e => {
  endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) currentSlide = (currentSlide + 1) % slides.length;
  else if (endX - startX > 50) currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

/* ================= REVIEWS CAROUSEL ================= */
let currentReview = 0;
const reviews = document.querySelectorAll('.review');

function showReview(index){
  if (!reviews[index]) return;
  reviews.forEach(r => r.classList.remove('active'));
  reviews[index].classList.add('active');
}

if (reviews.length > 0){
  setInterval(() => {
    currentReview = (currentReview + 1) % reviews.length;
    showReview(currentReview);
  }, 4000);
}

/* ================= BOOKING FORM ================= */
const bookingForm = document.getElementById('bookingForm');
const confirmationPopup = document.getElementById('confirmationPopup');

bookingForm?.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !phone || !service) { alert("Please fill in all required fields!"); return; }

  const text = `Hello, I would like to book: ${service}. Name: ${name}, Phone: ${phone}, Message: ${message}`;
  const whatsappURL = `https://wa.me/254704222666?text=${encodeURIComponent(text)}`;

  confirmationPopup.style.display = 'block';
  setTimeout(() => {
    window.open(whatsappURL,'_blank');
    confirmationPopup.style.display = 'none';
    bookingForm.reset();
  }, 1000);
});

/* ================= PAYMENT BUTTONS ================= */
function copyText(text){
  navigator.clipboard.writeText(text)
    .then(()=>alert(`Copied: ${text}`))
    .catch(()=>alert('Copy failed'));
}

/* ================= HAMBURGER MENU ================= */
const nav = document.querySelector('header nav');
const burger = document.createElement('div');
burger.className = 'burger';
burger.innerHTML = '&#9776;';
document.querySelector('header').appendChild(burger);

burger.addEventListener('click', () => {
  if(nav.style.display === 'flex'){
    nav.style.display = 'none';
  } else {
    nav.style.display = 'flex';
  }
});
