const startingURL = "http://localhost:3000/monsters/?_limit=50&_page=1"
let currentURL = startingURL

document.addEventListener("DOMContentLoaded", () => {
    getMonsterList()
    makeForm()
    addButtonFunctionality()
})

function getMonsterList() {
    fetch(currentURL).then(
        resp => resp.json()
    ).then(
        json => makeCards(json)
    )
}

function makeCards(json) {
    for (const monster of json) {
        let name = monster.name
        let age = monster.age
        let description = monster.description 

        let container = document.querySelector('#monster-container')
        let card = document.createElement('div')
        let nameArea = document.createElement('p')
        let ageArea = document.createElement('p')
        let descriptionArea = document.createElement('p')

        nameArea.innerText = name 
        ageArea.innerText = age
        descriptionArea.innerText = description

        container.append(card)
        card.append(nameArea)
        card.append(ageArea)
        card.append(descriptionArea)
    }
}

function makeForm () {
    let formContainer = document.querySelector("#create-monster")
    let form = document.createElement('form')
    let nameLabel = document.createElement('label')
    let nameInput = document.createElement('input')
    let ageLabel = document.createElement('label')
    let ageInput = document.createElement('input')
    let descriptionLabel = document.createElement('label')
    let descriptionInput = document.createElement('input')
    let submitButton = document.createElement('input')
    
    nameLabel.innerText = "Name:"
    nameInput.type = "text"
    ageLabel.innerText = "Age:"
    ageInput.type = "text"
    descriptionLabel.innerText = "Description:"
    descriptionInput.type = "text"
    submitButton.type = "Submit"

    form.addEventListener('submit', (event) => {
        event.preventDefault() 
        
        let paramsObject = {
            name: nameInput.value, age: ageInput.value, description: descriptionInput.value
        }
        let payload = JSON.stringify(paramsObject)

        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: payload 
        })
    })

    formContainer.append(form)
    form.append(
        nameLabel, nameInput, ageLabel, ageInput, 
        descriptionLabel, descriptionInput, submitButton
    )
}

function addButtonFunctionality() {
    let forward = document.querySelector("#forward")
    let back = document.querySelector("#back")

    forward.addEventListener('click', (event) => {
        urlArray = currentURL.split("=")
        currentPageNumber = urlArray[2]
        newPageNumber = parseInt(currentPageNumber) + 1 
        currentURL = `http://localhost:3000/monsters/?_limit=50&_page=${newPageNumber}`
        deleteAllMonsters()
        getMonsterList()
    })

    back.addEventListener('click', (event) => {
        urlArray = currentURL.split("=")
        currentPageNumber = urlArray[2]
        newPageNumber = parseInt(currentPageNumber) - 1 
        currentURL = `http://localhost:3000/monsters/?_limit=50&_page=${newPageNumber}`
        deleteAllMonsters()
        getMonsterList()
    })
}

function deleteAllMonsters() {
    let monsterContainer = document.querySelector('#monster-container')
    monsterContainer.innerHTML = ""
}