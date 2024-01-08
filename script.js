document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Lütfen bir görev girin!");
        return;
    }

    var li = document.createElement("li");
    li.innerHTML = `<span>${taskInput.value}</span><button class="delete" onclick="deleteTask(this)">Sil</button>`;
    taskList.appendChild(li);

    saveTask(taskInput.value);
    taskInput.value = "";
}

function deleteTask(button) {
    var taskList = document.getElementById("taskList");
    var li = button.parentNode;
    taskList.removeChild(li);

    var tasks = getTasks();
    var taskText = li.firstChild.textContent;
    tasks = tasks.filter(task => task !== taskText);
    saveTasks(tasks);
}

function saveTask(task) {
    var tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
    var tasksString = localStorage.getItem("tasks");
    return tasksString ? JSON.parse(tasksString) : [];
}

function loadTasks() {
    var tasks = getTasks();
    var taskList = document.getElementById("taskList");

    tasks.forEach(task => {
        var li = document.createElement("li");
        li.innerHTML = `<span>${task}</span><button class="delete" onclick="deleteTask(this)">Sil</button>`;
        taskList.appendChild(li);
    });
}
