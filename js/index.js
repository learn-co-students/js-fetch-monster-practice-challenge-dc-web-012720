document.addEventListener("DOMContentLoaded", () => {
    // console.log("woo");
    fetchMonsters();
    clickForBtn();
    createForm();
})

let page_number = 1;

function createForm() {
    let targetDiv = document.getElementById('create-monster')

    let formCreate = document.createElement('form')

    // Creating Inputs and Buttons
        let inputName = document.createElement('input')
        let inputAge = document.createElement('input')
        let inputBio = document.createElement('input')
        let formButton = document.createElement('button')

    // Assign Id's and Whatnot
        formCreate.id = 'monster-form'
        inputName.id = 'form-name'
        inputAge.id = 'form-age'
        inputBio.id = 'form-bio'
        formButton.innerHTML = 'Create'

    // Give PlaceHolders
        inputName.placeholder = 'Name: '
        inputAge.placeholder = "Age: "
        inputBio.placeholder = "Description: "

    // Add event to button
        formButton.addEventListener('click', processForm)

    // Append Elements
        formCreate.append(inputName, inputAge, inputBio, formButton)
        targetDiv.append(formCreate)

}

function processForm(event) {
    let theForm = document.querySelector('#monster-form')
    event.preventDefault()
    theForm.reset()
    let name = document.getElementById('form-name').value
    let age = document.getElementById('form-age').value 
    let bio = document.getElementById('form-bio').value


    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
        },
        body: JSON.stringify({
            "name": name,
            "age": age,
            "description": bio
    })
    })
    // .then(res => res.json())
    // .then(monst => renderMonsters(monst))
    
}

function btnResponse(event) {
    document.querySelector('#monster-container').innerHTML = ""

        if(event.currentTarget.id == "forward") {
            fetchMonsters(page_number += 1)
        } else {
             fetchMonsters(page_number -= 1)
        }
}

function clickForBtn() {
    let forBtn = document.getElementById('forward');
    forBtn.addEventListener('click', btnResponse);
    
    let backBtn = document.getElementById('back')
    backBtn.addEventListener('click', btnResponse)
}


function fetchMonsters(page_number = 1) {
    let number = page_number
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${number}`)
    .then(resp => resp.json())
    .then(resp => resp.forEach(monster => {
        renderMonsters(monster)
    }))
}

function renderMonsters(event) {
    
    let container = document.querySelector('#monster-container')

    let conDiv = document.createElement('div')

    let nameHead = document.createElement('h2')
        nameHead.innerText = event.name
    
    let ageHead = document.createElement('h4')
        ageHead.innerText = `Age: ${event.age}` 

    let bioPara = document.createElement('p')
        bioPara.innerText = `Bio: ${event.description}`

    conDiv.append(nameHead, ageHead, bioPara)
    
    container.append(conDiv)
}
