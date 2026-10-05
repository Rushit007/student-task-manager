const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    tasks.forEach((task, index) => {

        const listItem = document.createElement("li");
        listItem.className = "task-item";

        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = task.text;

        if (task.completed) {
            taskText.classList.add("completed");
        }

        const buttons = document.createElement("div");
        buttons.className = "task-buttons";

        const completeButton = document.createElement("button");
        completeButton.className = "complete-button";
        completeButton.textContent = "Complete";

        completeButton.addEventListener("click", function() {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        buttons.appendChild(completeButton);
        buttons.appendChild(deleteButton);

        listItem.appendChild(taskText);
        listItem.appendChild(buttons);

        taskList.appendChild(listItem);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskInput.focus();
}

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

displayTasks();