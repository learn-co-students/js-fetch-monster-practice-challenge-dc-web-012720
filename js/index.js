let pageNum

document.addEventListener("DOMContentLoaded", () => {
    pageNum = 1

    let forwardButton = document.getElementById('forward')
    let backButton = document.getElementById('back')
    forwardButton.addEventListener("click", forwardClickHandler)
    backButton.addEventListener("click", backClickHandler)

    let newMonsterButton = document.getElementById('create-button')
    newMonsterButton.addEventListener("click", newFormHandler)

    getMonsters()
})

function getMonsters() {
    let baseUrl = `http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`
    fetch(baseUrl).then(resp => resp.json()).then(monsters => monsters.forEach(monster => renderMonster(monster)))
}

function renderMonster(monster) {
    let card = document.createElement('div')
    let container = document.getElementById('monster-container')
    let name = document.createElement('h2')
    let age = document.createElement('p')
    let description = document.createElement('p')

    name.innerText = monster.name
    age.innerText = monster.age
    description.innerText = monster.description

    card.append(name, age, description)
    container.append(card)
}

function forwardClickHandler(event) {
    pageNum ++

    let container = document.getElementById('monster-container')
    container.innerHTML = " "
    getMonsters()
}

function backClickHandler(event) {
    if (pageNum === 1) {
        alert("There's no more monsters that way.")
    } else {
        pageNum --

        let container = document.getElementById('monster-container')
        container.innerHTML = " "
        getMonsters()
    }
}

function newFormHandler(event) {
    let form = document.getElementById('new-monster-form')
    form.hidden = false

    let submitButton = document.getElementById('submit-button')
    submitButton.addEventListener("click", submitFormHandler)
}

function submitFormHandler(event) {
    event.preventDefault()
    console.log(event.target.parentNode)

    let name = event.target.parentNode.name.value
    let age = event.target.parentNode.age.value
    let description = event.target.parentNode.description.value

    

    console.log(name)
}