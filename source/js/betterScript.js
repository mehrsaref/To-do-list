let taskArray = []
let classifiedOutput = []
let searchOutput = []
let toDo =  {}
let activeBtn = 'all'
let searchQuery
let $ = document
let searchInput = $.querySelector('.search--input')
let searchList = $.querySelector('.search--list')
let toDoLabel = $.querySelector('.todo--label')
let inputTask = $.querySelector('.todo--input')
let taskList = $.querySelector('.task--list')
let btnAll = $.querySelector('.all--btn')
let btnDone = $.querySelector('.done--btn')
let btnUndone = $.querySelector('.undone--btn')
searchInput.addEventListener('keydown',function (event){
    if(event.key === 'Enter'){
        searchQuery = searchInput.value
        if(searchQuery){
            activeBtn = 'search'
            filterArray()
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
            classifiedOutput.push(toDo)
            inputTask.value = ''
            filterArray()
        }
    }
})
btnAll.addEventListener('focus', function (){
    toDoLabel.innerHTML = 'Tasks to do &#8595'
    activeBtn = 'all'
    btnAll.style.filter = 'brightness(.9)'
    filterArray()
})
btnDone.addEventListener('focus', function (){
    toDoLabel.innerHTML = 'Completed today &#8595'
    activeBtn = 'done'

    btnAll.style.filter = 'brightness(1)'
    filterArray()
})
btnUndone.addEventListener('focus', function (){
    toDoLabel.innerHTML = 'In progress &#8595'
    activeBtn = 'undone'
    btnAll.style.filter = 'brightness(1)'
    filterArray()
})

function addTask(toDo){
    let newTask = $.createElement('li')
    newTask.className = 'list-group-item d-flex justify-content-between align-items-center'
    let taskCheckBox = $.createElement('input')
    taskCheckBox.className = 'checkbox--style'
    taskCheckBox.type ='checkbox'
    let taskText = $.createElement('span')
    taskText.innerHTML = toDo.name
    let deleteIcon = $.createElement('i')
    deleteIcon.className ='fa fa-trash-o delete'
    taskCheckBox.checked = toDo.checked === 'true';

    taskCheckBox.addEventListener('click', function (event){
        let removedItem
        if(event.target.checked){
            taskArray.find(function (todo){
                if(todo.name === event.target.nextSibling.innerHTML){
                    todo.checked = 'true'
                    removedItem = todo
                }
            })
            taskArray = taskArray.filter(function (todo){
                return todo.name !== removedItem.name
            })
            taskArray.push(removedItem)
        } else {
            taskArray.find(function (todo){
                if(todo.name === event.target.nextSibling.innerHTML){
                    todo.checked = 'false'
                }
            })
        }
        filterArray()
    })
    deleteIcon.addEventListener('click',function (event){
        taskArray = taskArray.filter(function (todo){
            if(todo.name === event.target.previousSibling.innerHTML){
                event.target.parentElement.remove()
            }
            return todo.name !== event.target.previousSibling.innerHTML
        })
        filterArray()
    })
    newTask.append(taskCheckBox,taskText,deleteIcon)
    return newTask
}

function filterArray(){
    searchList.style.display = 'none'
    taskList.style.display = 'block'
    taskList.replaceChildren()
    if (activeBtn === 'all') {
        classifiedOutput = []
        classifiedOutput = taskArray
        inputTask.placeholder = 'Add a new task'
        classifiedOutput.forEach(function (todo) {
            taskList.appendChild(addTask(todo))
        })
    }
    if(activeBtn === 'done'){
        classifiedOutput = []
        classifiedOutput = taskArray.filter(function (todo){
            return todo.checked === 'true'
        })
        if(!classifiedOutput.length){
            inputTask.placeholder = 'Empty!'
        } else{
            classifiedOutput.forEach(function (todo){
                taskList.appendChild(addTask(todo))
                inputTask.placeholder = 'Add a new task'
            })
        }
    }
    if(activeBtn === 'undone'){
        classifiedOutput = []
        classifiedOutput = taskArray.filter(function (todo){
            return todo.checked === 'false'
        })
        if(!classifiedOutput.length){
            inputTask.placeholder = 'Empty!'
        } else{
            classifiedOutput.forEach(function (todo){
                taskList.appendChild(addTask(todo))
                inputTask.placeholder = 'Add a new task'
            })
        }
    }
    if(activeBtn === 'search'){
        searchOutput = []
        classifiedOutput.find(function (todo){
            if(todo.name.includes(searchQuery)){
                searchOutput.push(todo)
            }
        })
        if(!searchOutput.length){
            inputTask.placeholder = 'No result for "'+ searchQuery + '"'
        } else {
            inputTask.placeholder = 'search results for "'+ searchQuery + '":'
        }
        searchList.style.display = 'block'
        taskList.style.display = 'none'
        searchList.replaceChildren()
        searchOutput.forEach(function (todo){
            searchList.appendChild(addTask(todo))
        })
    }
}