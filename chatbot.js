document.addEventListener("DOMContentLoaded", () => {
  const chatbotContainer = document.getElementById("chatbot-container");
  const chatbotToggle = document.getElementById("chatbot-toggle");
  const chatbotClose = document.getElementById("chatbot-close");
  const chatbotMessages = document.getElementById("chatbot-messages");
  const chatbotInput = document.getElementById("chatbot-input");
  const chatbotSend = document.getElementById("chatbot-send");
  const chatbotOptions = document.querySelectorAll("#chatbot-options button");

  /* ===== TOGGLE CHATBOT ===== */
  chatbotToggle.addEventListener("click", () => {
    chatbotContainer.style.display = "flex";
    chatbotToggle.style.display = "none";
  });

  chatbotClose.addEventListener("click", () => {
    chatbotContainer.style.display = "none";
    chatbotToggle.style.display = "flex";
  });

  /* ===== SEND MESSAGE ===== */
  chatbotSend.addEventListener("click", sendMessage);

  chatbotInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;

    addUserMessage(message);
    chatbotInput.value = "";

    setTimeout(() => {
      botReply(message.toLowerCase());
    }, 600);
  }

  /* ===== QUICK OPTIONS ===== */
  chatbotOptions.forEach(button => {
    button.addEventListener("click", () => {
      const option = button.dataset.option;
      addUserMessage(button.innerText);
      setTimeout(() => botReply(option), 500);
    });
  });

  /* ===== MESSAGE FUNCTIONS ===== */
  function addUserMessage(text) {
    const msg = document.createElement("div");
    msg.className = "user-message";
    msg.textContent = text;
    chatbotMessages.appendChild(msg);
    scrollDown();
  }

  function addBotMessage(text) {
    const msg = document.createElement("div");
    msg.className = "bot-message";
    msg.innerHTML = text;
    chatbotMessages.appendChild(msg);
    scrollDown();
  }

  function scrollDown() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  /* ===== BOT LOGIC ===== */
  function botReply(input) {
    if (input.includes("service")) {
      addBotMessage(`
        🔧 <strong>Our Services:</strong><br>
        • Engine Service<br>
        • Diagnostics & Programming<br>
        • Transmission<br>
        • Suspension<br>
        • Body Works & Paint<br>
        • Pre-Purchase Inspection
      `);
    }
    else if (input.includes("book")) {
      addBotMessage(`
        📅 You can book an appointment below:<br>
        <a href="#booking">Click here to Book</a>
      `);
    }
    else if (input.includes("location")) {
      addBotMessage(`
        📍 <strong>Our Locations:</strong><br>
        • Ngong Road<br>
        • Kiambu By-pass<br>
        • Karen
      `);
    }
    else if (input.includes("contact")) {
      addBotMessage(`
        📞 <strong>Contact Us:</strong><br>
        Phone: <a href="tel:+254704222666">0704 222 666</a><br>
        Email: <a href="mailto:germanexpertscenter@gmail.com">germanexpertscenter@gmail.com</a>
      `);
    }
    else if (input.includes("hello") || input.includes("hi")) {
      addBotMessage("Hello 👋 How can I assist you today?");
    }
    else {
      addBotMessage(
        "I'm here to help 😊<br>Select an option below or type your question."
      );
    }
  }
});
