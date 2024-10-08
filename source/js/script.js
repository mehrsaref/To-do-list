let taskArray = []
let toDo =  {}
let filteredArray = []
let checkedTasks = []
let uncheckedTasks = []
let activeBtn = 'all'
let isSearching = false
let searchQuery

let $ = document
let searchInput = $.querySelector('.search--input')
let toDoLabel = $.querySelector('.todo--label')
let inputTask = $.querySelector('.task--input')
let taskList = $.querySelector('.task--list')
let btnAll = $.querySelector('.all--btn')
let btnDone = $.querySelector('.done--btn')
let btnUndone = $.querySelector('.undone--btn')

window.addEventListener('load', function(){
    if(JSON.parse(localStorage.getItem('tasks'))){
        taskArray = JSON.parse(localStorage.getItem('tasks'))
        filter()
    }
})
searchInput.addEventListener('keydown',function (event){
    if(event.key === 'Enter'){
        searchQuery = searchInput.value
        if(searchQuery){
            isSearching = true
            filter()
            searchInput.value = ''
        }
    }
})
inputTask.addEventListener('keydown',function (event) {
    if(event.key === 'Enter'){
        event.preventDefault()
        if (inputTask.value){
            taskArray = taskArray.filter(function (todo){
                return todo.name !== inputTask.value
            })
            toDo =  {name:'', checked:'false'}
            toDo.name = inputTask.value.trim()
            taskArray.push(toDo)
            filteredArray.push(toDo)
            inputTask.value = ''
            filter()
        }
    }
})
btnAll.addEventListener('click', function (){
    toDoLabel.innerHTML = 'To do &#8595'
    activeBtn = 'all'
    isSearching = false
    btnAll.style.filter = 'brightness(.9)'
    btnDone.style.filter = 'brightness(1)'
    btnUndone.style.filter = 'brightness(1)'
    filter()
})
btnDone.addEventListener('click', function (){
    toDoLabel.innerHTML = 'Done &#8595'
    activeBtn = 'done'
    isSearching = false
    btnAll.style.filter = 'brightness(1)'
    btnDone.style.filter = 'brightness(.9)'
    btnUndone.style.filter = 'brightness(1)'
    filter()
})
btnUndone.addEventListener('click', function (){
    toDoLabel.innerHTML = 'Undone &#8595'
    activeBtn = 'undone'
    isSearching = false
    btnAll.style.filter = 'brightness(1)'
    btnDone.style.filter = 'brightness(1)'
    btnUndone.style.filter = 'brightness(.9)'
    filter()
})

function addTask(toDo){
    let newTask = $.createElement('li')
    newTask.className = 'list-group-item d-flex justify-content-between align-items-center'
    let taskCheckBox = $.createElement('input')
    taskCheckBox.className = 'checkbox--style'
    taskCheckBox.type ='checkbox'
    let taskText = $.createElement('span')
    taskText.innerHTML = toDo.name
    let editBox = $.createElement('div')
    editBox.className = 'edit--box'
    let editIcon = $.createElement('i')
    editIcon.className ='fa fa-pencil edit'
    let deleteIcon = $.createElement('i')
    deleteIcon.className ='fa fa-trash-o delete'
    editBox.append(editIcon,deleteIcon)
    taskCheckBox.checked = toDo.checked === 'true';
    taskCheckBox.addEventListener('click', handleCheckBoxClick)
    editIcon.addEventListener('click', handleEditTask)
    deleteIcon.addEventListener('click', handleDeleteTask)
    newTask.append(taskCheckBox,taskText,editBox)
    return newTask
}
function handleCheckBoxClick(event){
    if(event.target.checked){
        let checkedItem
        taskArray.find(function (todo){
            if(todo.name === event.target.nextSibling.innerHTML){
                todo.checked = 'true'
                checkedItem = todo
            }
        })
        checkedTasks = taskArray.filter(function (todo){
            return todo.checked === 'true' && todo.name !== checkedItem.name
        })
        checkedTasks.push(checkedItem)
        uncheckedTasks = taskArray.filter(function (todo){
            return todo.checked === 'false'
        })
        taskArray = uncheckedTasks.concat(checkedTasks)
    }
    else {
        let uncheckedItem
        taskArray.find(function (todo){
            if(todo.name === event.target.nextSibling.innerHTML){
                todo.checked = 'false'
                uncheckedItem = todo
            }
        })
        checkedTasks = taskArray.filter(function (todo){
            return todo.checked === 'true'
        })
        uncheckedTasks = uncheckedTasks.filter(function (todo){
            return todo.checked === 'false' && todo.name !== uncheckedItem.name
        })
        uncheckedTasks.push(uncheckedItem)
        taskArray = uncheckedTasks.concat(checkedTasks)
    }
    filter()
}
function handleDeleteTask(event){
    let removedItem = event.target.parentElement.previousSibling
    taskArray = taskArray.filter(function (todo){
        return todo.name !== removedItem.innerHTML
    })
    filteredArray = filteredArray.filter(function (todo){
        return todo.name !== removedItem.innerHTML
    })
    filter()
}
function handleEditTask(event){
    let toDoName = event.target.parentElement.previousSibling.innerHTML
    let editModal = $.createElement('div')
    editModal.className = 'edit--modal'
    let closeModal = $.createElement('i')
    closeModal.className = 'fa fa-close close--modal'
    let modalInput = $.createElement('input')
    modalInput.className = 'modal--input'
    modalInput.value = toDoName
    editModal.append(closeModal,modalInput)
    $.querySelector('.site--container').style.opacity = '0.3'
    editModal.style.opacity = '1'
    closeModal.addEventListener('click',function (event){
        event.target.parentElement.remove()
        $.querySelector('.site--container').style.opacity = '1'
    })
    modalInput.addEventListener('keydown',function (event){
        if(event.key === 'Enter'){
            taskArray.find(function(task){
                if(task.name === toDoName){
                    task.name = event.target.value
                }
            })
            event.target.value = ''
            filter()
            $.querySelector('.site--container').style.opacity = '1'
            event.target.parentElement.remove()
        }
    })
    $.body.append(editModal)
}

function filter(){
    if (activeBtn === 'all') {
        checkedTasks = taskArray.filter(function(todo){
            return todo.checked === 'true'
        })
        uncheckedTasks = taskArray.filter(function(todo){
            return todo.checked === 'false'
        })
        taskArray= uncheckedTasks.concat(checkedTasks)
        taskList.replaceChildren()
        filteredArray = []
        filteredArray = taskArray
        inputTask.placeholder = 'Add a new task'
        filteredArray.forEach(function (todo) {
            taskList.appendChild(addTask(todo))
        })
    }
    if(activeBtn === 'done'){
        taskList.replaceChildren()
        filteredArray = []
        filteredArray = checkedTasks
        if(!filteredArray.length){
            inputTask.placeholder = 'Empty!'
        } else{
            inputTask.placeholder = 'Add a new task'
            filteredArray.forEach(function (todo){
                taskList.appendChild(addTask(todo))
            })
        }
    }
    if(activeBtn === 'undone'){
        taskList.replaceChildren()
        filteredArray = []
        filteredArray = uncheckedTasks
        if(!filteredArray.length){
            inputTask.placeholder = 'Empty!'
        } else{
            inputTask.placeholder = 'Add a new task'
            filteredArray.forEach(function (todo){
                taskList.appendChild(addTask(todo))
            })
        }
    }
    if(isSearching){
        taskList.replaceChildren()
        filteredArray =filteredArray.filter(function (todo){
            return todo.name.includes(searchQuery)
        })
        if(!filteredArray.length){
            inputTask.placeholder = 'No result for "'+ searchQuery + '"'
        } else {
            inputTask.placeholder = 'search results for "'+ searchQuery + '":'
        }
        let closeIcon = $.createElement('i')
        closeIcon.className = 'fa fa-close close--icon'
        taskList.append(closeIcon)
        closeIcon.addEventListener('click', function (){
            isSearching = false
            filter()
        })
        filteredArray.forEach(function (todo){
            taskList.appendChild(addTask(todo))
        })

    }
    localStorage.setItem('tasks',JSON.stringify(taskArray))
}