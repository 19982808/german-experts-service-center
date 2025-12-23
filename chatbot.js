/* =========================
   CHATBOT
========================= */
const chatbot = document.getElementById("chatbot-container");
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotSend = document.getElementById("chatbot-send");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotOptions = document.querySelectorAll("#chatbot-options button");

// Open / Close Chatbot
chatbotToggle.addEventListener("click", () => {
  chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";
});

chatbotClose.addEventListener("click", () => {
  chatbot.style.display = "none";
});

// Function to add messages
function addMessage(message, sender = "bot") {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(sender === "bot" ? "bot-message" : "user-message");
  msgDiv.textContent = message;
  chatbotMessages.appendChild(msgDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Send message on button click
chatbotSend.addEventListener("click", () => {
  const msg = chatbotInput.value.trim();
  if(msg){
    addMessage(msg, "user");
    chatbotInput.value = "";
    botReply(msg);
  }
});

// Send message on Enter key
chatbotInput.addEventListener("keypress", (e) => {
  if(e.key === "Enter"){
    chatbotSend.click();
  }
});

// Bot reply logic
function botReply(userMsg){
  let response = "Sorry, I didn't understand that. Please choose an option below.";
  
  const msgLower = userMsg.toLowerCase();

  if(msgLower.includes("service") || msgLower.includes("services")){
    response = "We offer Minor & Major Engine Service, Diagnosis & Programming, Transmission Services, Suspension, Body Works & Paint, Car Pre-Purchase Inspection, Online Coding & Software Upgrades, Key Duplication, and Interior Works.";
  } else if(msgLower.includes("book") || msgLower.includes("appointment")){
    response = "To book an appointment, please fill out the Booking Form on our website or click the WhatsApp button to contact us directly.";
  } else if(msgLower.includes("location") || msgLower.includes("branch")){
    response = "Our branches are located at Ngong Road, Kiambu By-pass, and Karen.";
  } else if(msgLower.includes("contact") || msgLower.includes("phone") || msgLower.includes("email")){
    response = "You can contact us via phone: 0704 222 666 / 0798 690 204 / 0704 831 822 or email: germanexpertscenter@gmail.com";
  }

  setTimeout(() => {
    addMessage(response, "bot");
  }, 800);
}

// Option buttons
chatbotOptions.forEach(btn => {
  btn.addEventListener("click", () => {
    const option = btn.getAttribute("data-option");
    addMessage(`You selected: ${option}`, "user");
    botReply(option);
  });
});
