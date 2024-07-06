let toDoArray = []
let toDo =  {}
let activeBtn = 'all'
let $ = document
let inputTask = $.querySelector('.form-control')
let allTasks = $.querySelector('.all--tasks')
let doneTasks = $.querySelector('.done--tasks')
let undoneTasks = $.querySelector('.undone--tasks')
let btnAll = $.querySelector('.all--btn')
let btnDone = $.querySelector('.done--btn')
let btnUndone = $.querySelector('.undone--btn')
let topLabel = $.querySelector('label')
let searchInput = $.querySelector('.search')
let searchResult = $.querySelector('.search--result')

searchInput.addEventListener('keydown',function (event){
    if(event.key === 'Enter'){
        if(searchInput.value){
            console.log(searchInput.value)
            search(searchInput.value)
            searchInput.value = ''
        }
    }
})
btnAll.addEventListener('focus', function (){
    allTasks.style.display = 'block'
    doneTasks.style.display = 'none'
    undoneTasks.style.display = 'none'
    topLabel.innerHTML = 'Tasks to do &#8595'
    activeBtn = 'all'
    searchResult.style.display = 'none'
    btnAll.style.filter = 'brightness(.9)'
})
btnDone.addEventListener('focus', function (){
        doneTasks.style.display = 'block'
        allTasks.style.display = 'none'
        undoneTasks.style.display = 'none'
        topLabel.innerHTML = 'Completed today &#8595'
        btnAll.style.filter = 'brightness(1)'
        activeBtn = 'done'
        searchResult.style.display = 'none'
})
btnUndone.addEventListener('focus', function (){
    undoneTasks.style.display = 'block'
    allTasks.style.display = 'none'
    doneTasks.style.display = 'none'
    topLabel.innerHTML = 'In progress &#8595'
    btnAll.style.filter = 'brightness(1)'
    activeBtn = 'undone'
    searchResult.style.display = 'none'
})
inputTask.addEventListener('keydown',function (event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        if (inputTask.value) {
            toDo =  {name:'', checked:'false'}
            toDo.name = inputTask.value.trim()
            toDoArray.push(toDo)
            inputTask.value = ''
            update()
        }
    }
})

function addTask(toDo){
    let newTask = $.createElement('li')
    newTask.className = 'list-group-item d-flex justify-content-between align-items-center'
    let taskText = $.createElement('span')
    taskText.innerHTML = toDo.name
    let taskCheckBox = $.createElement('input')
    taskCheckBox.className = 'checkbox--style'
    taskCheckBox.type ='checkbox'
    let deleteIcon = $.createElement('i')
    deleteIcon.className ='fa fa-trash-o delete'
    if (toDo.checked === 'true') {
        taskCheckBox.checked = true
        newTask.style.backgroundColor = '#dce1fd'
        newTask.style.filter = 'brightness(1.05)'
        taskText.style.textDecoration = 'line-through'
        taskText.style.color = 'grey'
        deleteIcon.style.color = 'grey'
    } else {
        taskCheckBox.checked = false
        newTask.style.backgroundColor = '#fff'
        taskText.style.textDecoration = 'none'
        taskText.style.color = 'black'
        deleteIcon.style.color = 'black'
    }
    taskCheckBox.addEventListener('click', function (event){
        if(event.target.checked){
            toDoArray.find(function (todo){
                if(todo.name === event.target.nextSibling.innerHTML){
                    todo.checked = 'true'
                }
            })
        } else {
            toDoArray.find(function (todo){
                if(todo.name === event.target.nextSibling.innerHTML){
                    todo.checked = 'false'
                }
            })
        }
        update()
    })
    deleteIcon.addEventListener('click',function (event){
        toDoArray = toDoArray.filter(function (todo){
            return todo.name !== event.target.previousSibling.innerHTML
        })
        update()
    })
    newTask.append(taskCheckBox,taskText,deleteIcon)
    return newTask
}

function update(){
    updateDone()
    updateUndone()
    updateAllTasks()
}
function updateAllTasks(){
    allTasks.replaceChildren()
    toDoArray.forEach(function (todo){
        allTasks.appendChild(addTask(todo))
    })
}
function updateDone(){
    doneTasks.replaceChildren()
    toDoArray.forEach(function (todo){
        if(todo.checked === 'true'){
            doneTasks.appendChild(addTask(todo))
        }
    })
}
function updateUndone(){
    undoneTasks.replaceChildren()
    toDoArray.forEach(function (todo){
        if(todo.checked === 'false'){
            undoneTasks.appendChild(addTask(todo))
        }
    })
}

function search(value){
    searchResult.replaceChildren()
    searchResult.style.display = 'block'
    if(activeBtn === 'all'){
        allTasks.style.display = 'none'
        toDoArray.forEach(function (todo){
            if(todo.name === value){
                searchResult.appendChild(addTask(todo))
            }
        })
    }
    if(activeBtn === 'done'){
        doneTasks.style.display = 'none'
        toDoArray.forEach(function (todo){
            if(todo.name === value && todo.checked === 'true'){
                searchResult.appendChild(addTask(todo))
            }
        })
    }
    if(activeBtn === 'undone'){
        undoneTasks.style.display = 'none'
        toDoArray.forEach(function (todo){
            if(todo.name === value && todo.checked === 'false'){
                searchResult.appendChild(addTask(todo))
            }
        })
    }
}