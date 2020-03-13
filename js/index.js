let page = 1;
document.addEventListener("DOMContentLoaded", () => pageSetup()
)

function pageSetup() {
    getMonsters(page);
    document.getElementById("forward").addEventListener("click", pageUp);
    document.getElementById("back").addEventListener("click", pageDown)
}

function getMonsters(page) {
    console.log(page)
    fetch(`http://localhost:3000/monsters/?_limit=20&_page=${page}`).then(resp => resp.json())
    .then(mons => mons.forEach(mon => renderMonster(mon)))
}

function renderMonster(mon) {
    let container = document.getElementById("monster-container")
    let name = document.createElement('h2');
    let age = document.createElement('h4');
    let bio = document.createElement('p');
    let card = document.createElement('div');
    card.className = "card"
    name.innerText = mon.name;
    age.innerText = mon.age;
    bio.innerText = mon.description;
    card.append(name,age,bio)
    container.append(card)
}

function pageUp() {
    deleteCards();
    page += 1;
    getMonsters(page)
}

function pageDown() {
    if (page > 1) {
    deleteCards();
    page -= 1;
    getMonsters(page)
    } else {
        alert("Giggity!")
    }
}

function deleteCards() {
    let cards = document.querySelector("#monster-container"); // HTML Collection
    cards.innerHTML = "";
}