/* =========================
   CHATBOT SCRIPT
========================= */

// Elements
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotContainer = document.getElementById("chatbot-container");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotSend = document.getElementById("chatbot-send");
const chatbotOptions = document.querySelectorAll("#chatbot-options button");

// ===== OPEN / CLOSE CHATBOT =====
chatbotToggle.addEventListener("click", () => {
  chatbotContainer.style.display = "flex";
});

chatbotClose.addEventListener("click", () => {
  chatbotContainer.style.display = "none";
});

// ===== APPEND MESSAGE =====
function appendMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatbotMessages.appendChild(msg);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// ===== SEND MESSAGE FROM INPUT =====
chatbotSend.addEventListener("click", () => {
  const text = chatbotInput.value.trim();
  if (text !== "") {
    appendMessage(text, "user");
    chatbotInput.value = "";
    setTimeout(() => botReply(text), 500);
  }
});

// Enter key sends message
chatbotInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    chatbotSend.click();
  }
});

// ===== QUICK OPTION BUTTONS =====
chatbotOptions.forEach((button) => {
  button.addEventListener("click", () => {
    appendMessage(button.textContent, "user");
    setTimeout(() => botReply(button.dataset.option), 500);
  });
});

// ===== BOT REPLIES =====
function botReply(message) {
  let reply = "I’m sorry, I didn’t understand that.";

  const msg = message.toLowerCase();

  if (msg.includes("services")) {
    reply =
      "We offer Engine Service, Diagnostics, Transmission, Suspension, Body Works, Key Duplication, and more!";
  } else if (msg.includes("booking")) {
    reply =
      "You can book an appointment using our booking form above or contact us directly on WhatsApp.";
  } else if (msg.includes("locations")) {
    reply =
      "We have branches at Ngong Road, Kiambu By-pass, and Karen.";
  } else if (msg.includes("contact")) {
    reply =
      "You can contact us via phone: 0704 222 666 or email: germanexpertscenter@gmail.com";
  }

  appendMessage(reply, "bot");
}
// TOGGLE CHATBOT
chatbotToggle.addEventListener("click", () => {
  if (chatbotContainer.style.display === "flex") {
    chatbotContainer.style.display = "none";
  } else {
    chatbotContainer.style.display = "flex";
  }
});

chatbotClose.addEventListener("click", () => {
  chatbotContainer.style.display = "none";
});
