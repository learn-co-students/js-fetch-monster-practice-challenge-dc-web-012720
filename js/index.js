//need to add limits so that pages don't go too low or too high.

document.addEventListener("DOMContentLoaded", () => {
    caches.page = 1
    createMonsterForm()
    fetchAllMonsters()
    backBtn = document.getElementById("back")
    forwardBtn = document.getElementById("forward")
    backBtn.addEventListener("click", (e) => {
        if (caches.page > 1){
            caches.page -=1
        }
        else 
        {caches.page = 1}
        fetchAllMonsters(e)})
    forwardBtn.addEventListener("click", (e) => {
        caches.page += 1
        fetchAllMonsters(e)})
})

function fetchAllMonsters() {
//retrieves all monsters from server
monsterDivs = document.getElementById("monster-container")
monsterDivs.innerHTML = ""
fetch(`http://localhost:3000/monsters/?_limit=20&_page=${caches.page}`)
    .then(res => res.json())
    .then(json => allMonstersArray(json))
}

function allMonstersArray(monsterJson) {
    let monstersArray = []
    monsterJson.forEach(monster => monstersArray.push(monster))
    monstersArray.forEach(monster => renderMonster(monster))
}

function renderMonster(monster){
    let container = document.getElementById("monster-container")

    let monsterEntry = document.createElement("div")
    monsterEntry.classList.add("monster-div")
    let monsterName = document.createElement("h2")
    monsterName.innerText = monster.name 
    let monsterAge = document.createElement("h4")
    monsterAge.innerText = `Age: ${monster.age}` 
    let monsterBio = document.createElement("p")
    monsterBio = `Bio: ${monster.description}`

    container.append(monsterEntry)
    monsterEntry.append(monsterName, monsterAge, monsterBio)
    
}

function createMonsterForm(){
    let formContainer = document.getElementById("create-monster")

    let monsterForm = document.createElement("form")
    monsterForm.id = "monster-form"
    let nameInput = document.createElement("input")
    nameInput.id = "name"
    nameInput.placeholder = "name..."
    let ageInput = document.createElement("input")
    ageInput.id = "age"
    ageInput.placeholder = "age..."
    let descriptionInput = document.createElement("input")
    descriptionInput.id = "description"
    descriptionInput.placeholder = "description..."
    let btn = document.createElement("button")
    btn.innerText = "Create"
    monsterForm.addEventListener("submit", processMonsterForm)

    formContainer.append(monsterForm)
    monsterForm.append(nameInput, ageInput, descriptionInput, btn)
}

function processMonsterForm(event) {
    event.preventDefault()
    let name = event.currentTarget.name.value
    let age = event.currentTarget.age.value
    let description = event.currentTarget.description.value
    let payload = {name: name, age: age, description: description}
    payload = JSON.stringify(payload)

    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: payload
    }).then(res => res.json())
        .then(monster => renderMonster(monster))
        
        event.target.reset()
        alert("Monster Created!")

    
    console.log("submitted")
}