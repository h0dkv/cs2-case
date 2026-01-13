const CASE_PRICE = 2.5;

let balance = Number(localStorage.getItem("balance")) || 100;
let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

const skins = [
    { name: "AK-47 | Blue Steel", rarity: "blue", chance: 50, price: 1.20 },
    { name: "M4A1-S | Night Terror", rarity: "blue", chance: 25, price: 1.10 },
    { name: "AWP | Neo-Noir", rarity: "purple", chance: 12, price: 6.50 },
    { name: "Desert Eagle | Printstream", rarity: "pink", chance: 7, price: 18.00 },
    { name: "Karambit | Doppler", rarity: "red", chance: 4, price: 120.00 },
    { name: "Butterfly Knife | Fade", rarity: "gold", chance: 2, price: 450.00 }
];

const itemsDiv = document.getElementById("items");
const resultDiv = document.getElementById("result");
const balanceSpan = document.getElementById("balance");
const invValueSpan = document.getElementById("invValue");
const inventoryList = document.getElementById("inventoryList");
const feed = document.getElementById("feed");
const openBtn = document.getElementById("openBtn");

updateUI();
startFakeMultiplayer();

openBtn.onclick = openCase;

function rollSkin() {
    const total = skins.reduce((a, b) => a + b.chance, 0);
    let roll = Math.random() * total;

    for (const skin of skins) {
        if (roll < skin.chance) return skin;
        roll -= skin.chance;
    }
}

function openCase() {
    if (balance < CASE_PRICE) {
        alert("Not enough balance!");
        return;
    }

    balance -= CASE_PRICE;
    updateUI();

    itemsDiv.innerHTML = "";
    resultDiv.textContent = "";
    openBtn.disabled = true;

    const winIndex = 32;
    const winningSkin = rollSkin();

    for (let i = 0; i < 40; i++) {
        const skin = i === winIndex ? winningSkin : rollSkin();
        const div = document.createElement("div");
        div.className = `item ${skin.rarity}`;
        div.style.backgroundImage = "url('assets/placeholder.png')";
        div.innerHTML = `<span>${skin.name}</span>`;
        itemsDiv.appendChild(div);
    }

    itemsDiv.style.transition = "none";
    itemsDiv.style.left = "0px";

    requestAnimationFrame(() => {
        itemsDiv.style.transition = "left 4.5s cubic-bezier(0.08,0.82,0.17,1)";
        itemsDiv.style.left = `-${winIndex * 150 - 375}px`;
    });

    setTimeout(() => {
        inventory.push(winningSkin);
        saveData();

        resultDiv.textContent = `🎉 You unboxed ${winningSkin.name} ($${winningSkin.price})`;
        addFeedEntry("You", winningSkin);

        openBtn.disabled = false;
        updateUI();
    }, 4700);
}

function updateUI() {
    balanceSpan.textContent = balance.toFixed(2);
    inventoryList.innerHTML = "";

    let totalValue = 0;
    inventory.forEach(item => {
        totalValue += item.price;
        const div = document.createElement("div");
        div.textContent = `${item.name} - $${item.price}`;
        inventoryList.appendChild(div);
    });

    invValueSpan.textContent = totalValue.toFixed(2);
    localStorage.setItem("balance", balance);
}

function saveData() {
    localStorage.setItem("inventory", JSON.stringify(inventory));
}

function startFakeMultiplayer() {
    const names = ["Alex", "SteamUser", "xXProXx", "CSKing", "LuckyGuy"];

    setInterval(() => {
        const name = names[Math.floor(Math.random() * names.length)];
        const skin = rollSkin();
        addFeedEntry(name, skin);
    }, 2500);
}

function addFeedEntry(name, skin) {
    const div = document.createElement("div");
    div.className = skin.rarity;
    div.textContent = `${name} unboxed ${skin.name}`;
    feed.prepend(div);

    if (feed.children.length > 20) {
        feed.removeChild(feed.lastChild);
    }
}
