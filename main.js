const task_value = document.getElementById('task_values')
const task_list = document.getElementById('tasks_lists')
const btn = document.getElementById('save')
let delete_btn = document.getElementById('delete')
let count = document.getElementById('count')
let values = JSON.parse(localStorage.getItem('values')) || []

document.addEventListener("DOMContentLoaded", function(){
    btn.addEventListener('click', addTask)
    delete_btn.addEventListener('click', deleteValue)
    task_value.addEventListener("keydown", function(event){
        if(event.key === "Enter"){
            addTask()
        }
    })
    displayTask()
})

function addTask(){
    let new_task = task_value.value
    if(new_task !== ""){
        values.push({name: new_task, disabled: false})
        displayTask()
        saveStorage()
    }
}

function displayTask(){
    task_list.innerHTML = ""
    values.forEach((item, index) => {
        let li = document.createElement("li")
        li.innerHTML = `<div class="d-flex gap-1 align-items-center">
        <input type="checkbox" class="todo-checkbox" ${item.disabled ? "checked" : ""}>
        <span class="${item.disabled ? "disabled" : ""}">${item.name}</span>
        </div>`
        li.querySelector(".todo-checkbox").addEventListener("change", function(){
            toggleTask(index)
        })
        task_list.appendChild(li)
    });
    count.innerText = values.length
}

function saveStorage(){
    localStorage.setItem("values", JSON.stringify(values))
}

function deleteValue(){
    values = []
    saveStorage()
    displayTask()
}

function toggleTask(index){
    values[index].disabled = !values[index].disabled
    saveStorage()
    displayTask()
}