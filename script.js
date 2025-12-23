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

// Auto-slide every 5 seconds
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000);

/* ================= TOUCH SLIDER FOR MOBILE ================= */
let startX = 0;
let endX = 0;
const heroSection = document.querySelector('.hero');

heroSection.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

heroSection.addEventListener('touchend', e => {
  endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  } else if (endX - startX > 50) {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }
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

  if (!name || !phone || !service) {
    alert("Please fill in all required fields!");
    return;
  }

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

/* ================= CHATBOT ================= */
document.addEventListener("DOMContentLoaded", () => {

  const chatbotContainer = document.getElementById("chatbot-container");
  const chatbotToggle = document.getElementById("chatbot-toggle");
  const chatbotClose = document.getElementById("chatbot-close");
  const chatbotSend = document.getElementById("chatbot-send");
  const chatbotInput = document.getElementById("chatbot-input");
  const chatbotMessages = document.getElementById("chatbot-messages");
  const chatbotOptions = document.querySelectorAll("#chatbot-options button");

  const WHATSAPP = "https://wa.me/254704222666";
  let bookingStep = null;
  let bookingData = { brand: "", service: "", name: "", phone: "" };

  /* OPEN / CLOSE CHATBOT */
  chatbotToggle.onclick = () => chatbotContainer.style.display = "flex";
  chatbotClose.onclick = () => chatbotContainer.style.display = "none";

  chatbotSend.onclick = sendMessage;
  chatbotInput.addEventListener("keypress", e => { if(e.key === "Enter") sendMessage(); });

  function sendMessage() {
    const msg = chatbotInput.value.trim();
    if (!msg) return;
    addMessage(msg, "user-message");
    chatbotInput.value = "";
    setTimeout(() => processMessage(msg), 500);
  }

  function addMessage(text, className) {
    const div = document.createElement("div");
    div.className = className;
    div.textContent = text;
    chatbotMessages.appendChild(div);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  /* CHATBOT LOGIC */
  function processMessage(message) {
    const msg = message.toLowerCase();
    if (bookingStep) { handleBookingFlow(message); return; }

    if (msg.includes("book") || msg.includes("appointment")) { startBooking(); return; }
    if (msg.includes("service")) {
      addMessage("We offer engine service, diagnostics, transmission, suspension, body works, coding, inspections, and key duplication.","bot-message");
      return;
    }
    if (msg.includes("location") || msg.includes("where")) {
      addMessage("We are located at Ngong Road, Kiambu By-pass, and Karen.","bot-message");
      return;
    }
    if (msg.includes("price") || msg.includes("cost")) {
      addMessage("Prices depend on your vehicle and service. I’ll connect you to WhatsApp for an accurate quote.","bot-message");
      redirectToWhatsApp("Hello, I would like a service quotation.");
      return;
    }
    if (msg.includes("contact") || msg.includes("call")) {
      addMessage("You can call us on 0704 222 666 or chat directly with our service advisor on WhatsApp.","bot-message");
      redirectToWhatsApp("Hello, I need assistance.");
      return;
    }

    addMessage("I can help you with services, booking, locations, or prices. Just tell me what you need.","bot-message");
  }

  /* BOOKING FLOW */
  function startBooking() {
    bookingStep = "brand";
    bookingData = { brand: "", service: "", name: "", phone: "" };
    addMessage("Great 👍 What car brand do you have?\nBMW, Audi, Mercedes, Volkswagen, Porsche, or Range Rover","bot-message");
  }

  function handleBookingFlow(message) {
    if (bookingStep === "brand") { bookingData.brand = message; bookingStep = "service"; addMessage("What service do you need?\nEngine Service, Diagnostics, Suspension, Transmission, Body Works, or Inspection","bot-message"); return; }
    if (bookingStep === "service") { bookingData.service = message; bookingStep = "name"; addMessage("May I have your name?","bot-message"); return; }
    if (bookingStep === "name") { bookingData.name = message; bookingStep = "phone"; addMessage("Please share your phone number.","bot-message"); return; }
    if (bookingStep === "phone") {
      bookingData.phone = message;
      bookingStep = null;
      const text = `Hello, I would like to book a service.\n\nName: ${bookingData.name}\nPhone: ${bookingData.phone}\nCar: ${bookingData.brand}\nService: ${bookingData.service}`;
      addMessage("Thank you! I’m redirecting you to WhatsApp to confirm your booking.","bot-message");
      redirectToWhatsApp(text);
    }
  }

  /* QUICK BUTTONS */
  chatbotOptions.forEach(btn => {
    btn.addEventListener("click", () => {
      addMessage(btn.innerText, "user-message");
      switch (btn.dataset.option) {
        case "services": processMessage("services"); break;
        case "booking": startBooking(); break;
        case "locations": processMessage("locations"); break;
        case "contact": processMessage("contact"); break;
      }
    });
  });

  /* REDIRECT TO WHATSAPP */
  function redirectToWhatsApp(text) {
    setTimeout(() => { window.open(`${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank"); }, 1200);
  }
});

/* ================= HAMBURGER MENU FOR MOBILE ================= */
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
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '100%';
    nav.style.right = '0';
    nav.style.background = '#fff';
    nav.style.padding = '1rem';
    nav.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
  }
});
