let input = document.querySelector(".input")
let submit = document.querySelector(".add")
let tasksDiv = document.querySelector(".tasks")
let colorInput = document.querySelector("input[type=color]")
let mainColor = document.querySelector(":root")

input.focus()

if (mainColor !== null) {
    mainColor.style.setProperty('--main-color', localStorage.getItem('color'))
    colorInput.value = localStorage.getItem('color')
}

colorInput.addEventListener("blur", () => {
    mainColor.style.setProperty('--main-color', colorInput.value)
    localStorage.setItem('color', colorInput.value)
})

let arrayOfTasks = []

if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}

getDataFromLocalStorage()

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        // e.preventDefault()
        submit.click()
    }
})

submit.onclick = () => {
    if (input.value !== "") {
        addTaskToArray(input.value)
        input.value = ""
        input.focus()
    } 
    else {
        alert("please enter a name for your task ^_^")
        input.focus()
    }
}

tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        deleteTaskWith(e.target.parentElement.getAttribute('data-id'))
        e.target.parentElement.remove()
    }
    if (e.target.classList.contains("task")) {
        toggleStatusTaskWith(e.target.getAttribute('data-id'))
        e.target.classList.toggle("done")
    }
})

function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    }
    arrayOfTasks.push(task)

    addElementsToPageForm(arrayOfTasks)

    addDataToLocalStorageFrom(arrayOfTasks)
}

function addElementsToPageForm(arrayOfTasks) {
    tasksDiv.innerHTML = ""
    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div")
        div.className = "task"
        div.style.textTransform = "capitalize"

        if (task.completed) {
            div.className = "task done"
        }

        div.setAttribute("data-id", task.id)
        let h3 = document.createElement("h3")
        let taskText = document.createTextNode(task.title)
        h3.appendChild(taskText)
        div.appendChild(h3)
        let span = document.createElement("span")
        span.className = "del"
        span.style.fontSize = '14px'
        span.appendChild(document.createTextNode("Delete"))
        div.appendChild(span)
        tasksDiv.appendChild(div)
    });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem('tasks')
    if (data) {
        let tasks = JSON.parse(data)
        addElementsToPageForm(tasks)
    }
}

function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)
    addDataToLocalStorageFrom(arrayOfTasks)
}

function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false)
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks)
}
