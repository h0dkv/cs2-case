const skins = [
    { name: "AK-47 | Blue Steel", rarity: "blue", chance: 40 },
    { name: "M4A1-S | Night Terror", rarity: "blue", chance: 40 },
    { name: "AWP | Neo-Noir", rarity: "purple", chance: 10 },
    { name: "Desert Eagle | Printstream", rarity: "pink", chance: 6 },
    { name: "Karambit | Doppler", rarity: "red", chance: 3 },
    { name: "Butterfly Knife | Fade", rarity: "gold", chance: 1 }
];

const itemsDiv = document.getElementById("items");
const resultDiv = document.getElementById("result");
const openBtn = document.getElementById("openBtn");

openBtn.addEventListener("click", openCase);

function getRandomSkin() {
    let roll = Math.random() * 100;
    let total = 0;

    for (let skin of skins) {
        total += skin.chance;
        if (roll <= total) return skin;
    }
}

function generateRoll() {
    itemsDiv.innerHTML = "";
    for (let i = 0; i < 40; i++) {
        const skin = getRandomSkin();
        const div = document.createElement("div");
        div.className = `item ${skin.rarity}`;
        div.textContent = skin.name;
        itemsDiv.appendChild(div);
    }
}

function openCase() {
    openBtn.disabled = true;
    resultDiv.textContent = "";
    generateRoll();

    const winningIndex = 30;
    const winningSkin = itemsDiv.children[winningIndex].textContent;

    itemsDiv.style.transition = "none";
    itemsDiv.style.left = "0px";

    setTimeout(() => {
        itemsDiv.style.transition = "left 4s cubic-bezier(0.1, 0.9, 0.2, 1)";
        itemsDiv.style.left = `-${winningIndex * 140 - 350}px`;
    }, 50);

    setTimeout(() => {
        resultDiv.textContent = `🎉 You won: ${winningSkin}`;
        openBtn.disabled = false;
    }, 4200);
}
