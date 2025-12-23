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

  function processMessage(message) {
    const msg = message.toLowerCase();
    if (bookingStep) { handleBookingFlow(message); return; }

    if (msg.includes("book") || msg.includes("appointment")) { startBooking(); return; }
    if (msg.includes("service")) { addMessage("We offer engine service, diagnostics, transmission, suspension, body works, coding, inspections, and key duplication.","bot-message"); return; }
    if (msg.includes("location") || msg.includes("where")) { addMessage("We are located at Ngong Road, Kiambu By-pass, and Karen.","bot-message"); return; }
    if (msg.includes("price") || msg.includes("cost")) { addMessage("Prices depend on your vehicle and service. I’ll connect you to WhatsApp for an accurate quote.","bot-message"); redirectToWhatsApp("Hello, I would like a service quotation."); return; }
    if (msg.includes("contact") || msg.includes("call")) { addMessage("You can call us on 0704 222 666 or chat directly with our service advisor on WhatsApp.","bot-message"); redirectToWhatsApp("Hello, I need assistance."); return; }

    addMessage("I can help you with services, booking, locations, or prices. Just tell me what you need.","bot-message");
  }

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

  function redirectToWhatsApp(text) {
    setTimeout(() => { window.open(`${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank"); }, 1200);
  }
});
