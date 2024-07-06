let btnAll = document.querySelector('.all--btn')
let btnDone = document.querySelector('.done--btn')
let btnUndone = document.querySelector('.undone--btn')

let inputToDo = document.querySelector('.form-control')
let tasksArray = []
let taskObj

let allTasks = document.querySelector('.all--tasks')
let doneTasks = document.querySelector('.done--tasks')
let undoneTasks = document.querySelector('.undone--tasks')

let newTask
let taskCheckBox
let taskText
let deleteTask

inputToDo.addEventListener('keydown',function (event){
    if (event.key === 'Enter'){
        event.preventDefault()
        if(inputToDo.value !==''){
            tasksArray.push(inputToDo.value)
            console.log(tasksArray)
            inputToDo.value = ''

            newTask = document.createElement('li')
            taskCheckBox = document.createElement('input')
            taskCheckBox.type ='checkbox'
            taskText = document.createElement('span')
            deleteTask = document.createElement('i')

            deleteTask.classList.add('fa', 'fa-trash-o', 'delete')
            newTask.classList.add('list-group-item','d-flex','justify-content-between','align-items-center')

            newTask.appendChild(taskCheckBox)
            newTask.appendChild(taskText)
            newTask.appendChild(deleteTask)

            tasksArray.forEach(function (task){
                taskText.innerHTML = task ;
                allTasks.appendChild(newTask)
                console.log(taskCheckBox.checked)

            })

            taskCheckBox.addEventListener('click',function (event){
                if(event.target.checked === true){
                    // doneTasks.appendChild(event.target.parentElement)
                    // console.log(allTasks)
                } else {
                    // undoneTasks.appendChild(event.target.parentElement)
                }
            })

            deleteTask.addEventListener('click',function (event){
                event.target.parentElement.remove();
            })
        }
    }
})


btnAll.addEventListener('click', function (){
    console.log('all')
    allTasks.style.display = 'block'
    doneTasks.style.display = 'none'
    undoneTasks.style.display = 'none'
})
btnDone.addEventListener('click', function (){
    console.log('done')
    doneTasks.style.display = 'block'
    allTasks.style.display = 'none'
    undoneTasks.style.display = 'none'
})
btnUndone.addEventListener('click', function (){
    console.log('undone')
    undoneTasks.style.display = 'block'
    allTasks.style.display = 'none'
    doneTasks.style.display = 'none'
})



