document.addEventListener("DOMContentLoaded", () => {
    // console.log("woo");
    fetchMonsters();
    clickForBtn();
})

let page_number = 1;

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
