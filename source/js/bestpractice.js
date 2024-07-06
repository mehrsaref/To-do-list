const $ = document
const toDoArray = []
const selectors = {
    inputTask: '.form-control',
    allTasks: '.all--tasks',
    doneTasks: '.done--tasks',
    undoneTasks: '.undone--tasks',
    btnAll: '.all--btn',
    btnDone: '.done--btn',
    btnUndone: '.undone--btn'
}

const elements = {
    inputTask: $(selectors.inputTask),
    allTasks: $(selectors.allTasks),
    doneTasks: $(selectors.doneTasks),
    undoneTasks: $(selectors.undoneTasks),
    btnAll: $(selectors.btnAll),
    btnDone: $(selectors.btnDone),
    btnUndone: $(selectors.btnUndone)
}

elements.inputTask.addEventListener('keydown', handleInputKeydown)
elements.btnAll.addEventListener('click', () => showTasks(elements.allTasks))
elements.btnDone.addEventListener('click', () => showTasks(elements.doneTasks))
elements.btnUndone.addEventListener('click', () => showTasks(elements.undoneTasks))

function handleInputKeydown(event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        const taskName = elements.inputTask.value.trim()
        if (taskName) {
            addTask({ name: taskName, checked: 'false' })
            elements.inputTask.value = ''
            updateTasks()
        }
    }
}

function addTask(toDo) {
    const newTask = $.createElement('li')
    newTask.className = 'list-group-item d-flex justify-content-between align-items-center'

    const taskText = $.createElement('span')
    taskText.innerHTML = toDo.name

    const taskCheckBox = $.createElement('input')
    taskCheckBox.type = 'checkbox'
    taskCheckBox.checked = toDo.checked === 'true'
    taskCheckBox.addEventListener('click', () => handleCheckboxClick(taskCheckBox, taskText, toDo))

    if (toDo.checked === 'true') {
        taskText.style.textDecoration = 'line-through'
        taskText.style.color = 'grey'
    }

    const deleteIcon = $.createElement('i')
    deleteIcon.className = 'fa fa-trash-o delete'
    deleteIcon.addEventListener('click', () => handleDeleteClick(newTask, toDo))

    newTask.append(taskCheckBox, taskText, deleteIcon)
    return newTask
}

function handleCheckboxClick(checkbox, taskText, toDo) {
    const isChecked = checkbox.checked
    toDo.checked = isChecked ? 'true' : 'false'
    taskText.style.textDecoration = isChecked ? 'line-through' : 'none'
    taskText.style.color = isChecked ? 'grey' : 'white'
    updateTasks()
}

function handleDeleteClick(taskElement, toDo) {
    toDoArray.splice(toDoArray.indexOf(toDo), 1)
    taskElement.remove()
    updateTasks()
}

function updateTasks() {
    updateTaskList(elements.allTasks, toDoArray)
    updateTaskList(elements.doneTasks, toDoArray.filter(todo => todo.checked === 'true'))
    updateTaskList(elements.undoneTasks, toDoArray.filter(todo => todo.checked === 'false'))
}

function updateTaskList(taskList, todos) {
    taskList.replaceChildren(...todos.map(addTask))
}

function showTasks(taskList) {
    elements.allTasks.style.display = 'none'
    elements.doneTasks.style.display = 'none'
    elements.undoneTasks.style.display = 'none'
    taskList.style.display = 'block'
}