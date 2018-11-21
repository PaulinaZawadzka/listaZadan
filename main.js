const form = document.querySelector('form');
const ulToDo = document.querySelector('ul.todo-list');
const ulDone = document.querySelector('ul.done-list');
const taskNumber = document.querySelector('h1.title-todo-list span');
const donetaskNumber = document.querySelector('h1.title-done-list span');
const listItems = document.getElementsByClassName('task'); ///tworzy HTML collections, ktre jest na żywo odswieżane
const input = document.querySelector('input');
const btnSearch = document.querySelector('button.btn-search');
const btnShowList = document.querySelector('button.btn-showList');

const toDoList = [];
const doneList = [];


const createUlTodo = () => {
    ulToDo.textContent = "";
    toDoList.forEach((toDoElement, key) => {
        toDoElement.dataset.key = key;
        ulToDo.appendChild(toDoElement);

    })
}

const removeTask = (e) => {
    e.preventDefault();
    const index = e.target.parentNode.dataset.key;
    toDoList.splice(index, 1);
    createUlTodo();
    taskNumber.textContent = listItems.length;

}

const doneTask = (e) => {

    const index = e.target.parentNode.dataset.key;
    const doneTask = e.target.parentNode.querySelector('span');

    const li = document.createElement('li');
    const bravo = document.createElement('span');
    const taskName = document.createElement('span');
    taskName.appendChild(doneTask);
    bravo.textContent = 'Brawo!';
    doneTask.className = "taskdone";
    bravo.className = "taskdone bravo";
    li.appendChild(taskName);
    li.appendChild(bravo);
    console.log(li);
    ulDone.appendChild(li);
    doneList.push(li);
    toDoList.splice(index, 1);
    createUlTodo();
    taskNumber.textContent = listItems.length;
    donetaskNumber.textContent = doneList.length
}

const searchText = () => {
    const searchText = input.value.toLowerCase();
    const searchToDoList = toDoList.filter(li => li.textContent.toLowerCase().includes(searchText));
    ulToDo.textContent = '';
    searchToDoList.forEach((toDoElement, key) => {
        toDoElement.dataset.key = key;
        ulToDo.appendChild(toDoElement);
        btnShowList.classList.add('show');
    })
}

btnSearch.addEventListener('click', searchText);


const showAllList = () => {
    console.log("a");
    ulToDo.textContent = '';
    toDoList.forEach(li => ulToDo.appendChild(li));
    btnShowList.classList.remove('show');
}

btnShowList.addEventListener('click', showAllList);



const addTask = (e) => {
    e.preventDefault();
    const titleTask = input.value;
    if (titleTask === "") return;
    const task = document.createElement('li');
    task.className = "task";
    toDoList.push(task);
    createUlTodo();
    task.innerHTML = "<span>" + titleTask + "</span>" + "<button class='btn-remove'>Usuń</button> <button class='btn-done'>Zrobione</button> ";
    ulToDo.appendChild(task);
    input.value = "";
    taskNumber.textContent = listItems.length;
    task.querySelector('button.btn-remove').addEventListener('click', removeTask);
    task.querySelector('button.btn-done').addEventListener('click', doneTask);
}


form.addEventListener("submit", addTask);