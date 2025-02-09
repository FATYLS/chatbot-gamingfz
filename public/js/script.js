const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

let step = 0;
let userResponses = {};

const jeux = {
    action: {
        pc: ["DOOM Eternal", "Call of Duty", "Fortnite"],
        playstation: ["God of War", "Spider-Man", "Uncharted"],
        switch: ["Zelda: Breath of the Wild", "Super Mario Odyssey"]
    },
    rpg: {
        pc: ["The Witcher 3", "Elder Scrolls V: Skyrim"],
        playstation: ["Final Fantasy VII", "Horizon Zero Dawn"],
        switch: ["Xenoblade Chronicles", "Fire Emblem"]
    }
    // Ajoute d'autres types de jeux ici
};

sendBtn.addEventListener("click", () => {
    const userText = userInput.value.trim();
    if (!userText) return;

    addMessage(userText, "user");

    if (step === 0) {
        userResponses.type = userText.toLowerCase();
        botTyping("Sur quelle plateforme joues-tu ? (pc, playstation, switch)");
    } else if (step === 1) {
        userResponses.plateforme = userText.toLowerCase();
        botTyping("Combien de temps as-tu pour jouer ? (courte, moyenne, longue)");
    } else if (step === 2) {
        userResponses.duree = userText.toLowerCase();
        botTyping("Voici ta recommandation...");
        setTimeout(() => {
            const recommendations = jeux[userResponses.type] && jeux[userResponses.type][userResponses.plateforme];
            const recommendedGames = recommendations ? recommendations.join(", ") : "Aucune recommandation disponible.";
            addMessage(`🎮 Je te recommande ces jeux : ${recommendedGames}`, "bot");
        }, 1000);
    }
    step++;
    userInput.value = "";
});

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function botTyping(text) {
    setTimeout(() => {
        addMessage(text, "bot");
    }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".background-slider img");
    let index = 0;

    function changeBackground() {
        images[index].classList.remove("active");
        index = (index + 1) % images.length;
        images[index].classList.add("active");
    }

    setInterval(changeBackground, 5000); // Change toutes les 5 secondes
});

document.addEventListener("DOMContentLoaded", function () {
    const welcomeScreen = document.querySelector(".welcome-screen");
    const startButtonContainer = document.querySelector(".start-button-container");
    const chatContainer = document.querySelector(".chat-container");
    const startButton = document.getElementById("start-chat-btn");

    // Disparition du message de bienvenue après 3s
    setTimeout(() => {
        welcomeScreen.style.opacity = "0";
        setTimeout(() => {
            welcomeScreen.style.display = "none";
            startButtonContainer.style.display = "block"; // Afficher le bouton
        }, 1000);
    }, 3000);

    // Affichage du chatbot au clic sur le bouton
    startButton.addEventListener("click", function () {
        startButtonContainer.style.display = "none"; // Cacher le bouton
        chatContainer.classList.add("show"); // Activer le chatbot
    });
});
