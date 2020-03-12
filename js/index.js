document.addEventListener("DOMContentLoaded", () => {
    fetchMonsters();
    document.querySelector(".create-btn").addEventListener("submit",createMonster)
    let notNumber = 1;
    let forwardBtn = document.querySelector("#forward");
    forwardBtn.addEventListener("click", () => {
        let div = document.querySelector("#monster-container")
        removeChildren(div)
        notNumber += 1
        fetchMonsters(notNumber);
    }
    )
});

function fetchMonsters(pageNumber) {
    console.log("this was clicked")
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then(response => response.json())
    .then(json => json.forEach(resp => renderMonster(resp)))
}

function renderMonster(event) {
    let div = document.getElementById("monster-container");
    let newUl = document.createElement("ul");
    newUl.id = `monster-${event.id}`
    let nameLi = document.createElement("li");
    let ageLi = document.createElement("li");
    let descriptionLi = document.createElement("li");
    nameLi.innerText = event.name;
    ageLi.innerText = event.age;
    descriptionLi.innerText = event.description;
    newUl.append(nameLi, ageLi, descriptionLi);
    div.append(newUl);
}

function createMonster(event) {
    event.preventDefault()
    debugger;
    let name = document.querySelector(".name").value;
    let age = document.querySelector(".age").value;
    let description = document.querySelector(".description").value;
    let data = {"name": name, "age": age, "description": description};
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        //   Accept: "application/json"
        }, 
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(monster => renderMonster(monster))
    event.target.reset();
}

function movePageForward(pageNumber) {
    console.log(pageNumber)
    pageNumber += 1;
    // debugger;
    fetchMonsters(2);//pageNumber);
}

function removeChildren(div) {
    let child = div.lastElementChild;
    while (child) {
        div.removeChild(child);
        child = div.lastElementChild;
    }
}