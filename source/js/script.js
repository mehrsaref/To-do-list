let taskArray = []
let filteredArray = []
// let searchOutput = []
let toDo =  {}
let activeBtn = 'all'
let isSearching = false
let searchQuery
let $ = document
let searchInput = $.querySelector('.search--input')
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
    taskCheckBox.addEventListener('click', function (event){
        let checkedItem
        if(event.target.checked){
            taskArray.find(function (todo){
                if(todo.name === event.target.nextSibling.innerHTML){
                    todo.checked = 'true'
                    checkedItem = todo
                }
            })
            taskArray = taskArray.filter(function (todo){
                return todo.name !== checkedItem.name
            })
            taskArray.push(checkedItem)
        }
        else {
            taskArray.find(function (todo){
                if(todo.name === event.target.nextSibling.innerHTML){
                    todo.checked = 'false'
                }
            })
        }
        filter()
    })
    editIcon.addEventListener('click', function (event){
        let editModal = $.createElement('div')
        editModal.className = 'edit--modal'
        let closeModal = $.createElement('i')
        closeModal.className = 'fa fa-close close--modal'
        let modalInput = $.createElement('input')
        modalInput.className = 'modal--input'
        modalInput.value = taskText.innerHTML
        editModal.append(closeModal,modalInput)
        $.querySelector('.site--container').style.opacity = '0.3'
        editModal.style.opacity = '1'
        closeModal.addEventListener('click',function (event){
            event.target.parentElement.remove()
            $.querySelector('.site--container').style.opacity = '1'
        })

        modalInput.addEventListener('keydown',function (event){
            if(event.key === 'Enter'){
                toDo.name =event.target.value
                event.target.value = ''
                filter()
                $.querySelector('.site--container').style.opacity = '1'
                event.target.parentElement.remove()
            }
        })
        $.body.append(editModal)
    })
    deleteIcon.addEventListener('click',function (event){
        let removedItem = event.target.parentElement.previousSibling
        taskArray = taskArray.filter(function (todo){
            return todo.name !== removedItem.innerHTML
        })
        filteredArray = filteredArray.filter(function (todo){
            return todo.name !== removedItem.innerHTML
        })

        filter()
    })
    newTask.append(taskCheckBox,taskText,editBox)
    return newTask
}
function filter(){
    if (activeBtn === 'all') {
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
        filteredArray = taskArray.filter(function (todo){
            return todo.checked === 'true'
        })
        if(!filteredArray.length){
            inputTask.placeholder = 'Empty!'
        } else{
            filteredArray.forEach(function (todo){
                taskList.appendChild(addTask(todo))
                inputTask.placeholder = 'Add a new task'
            })
        }
    }
    if(activeBtn === 'undone'){
        taskList.replaceChildren()
        filteredArray = []
        filteredArray = taskArray.filter(function (todo){
            return todo.checked === 'false'
        })
        if(!filteredArray.length){
            inputTask.placeholder = 'Empty!'
        } else{
            filteredArray.forEach(function (todo){
                taskList.appendChild(addTask(todo))
                inputTask.placeholder = 'Add a new task'
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
}