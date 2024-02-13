const inputField = document.querySelector(".input");
const addBtn = document.querySelector(".add");
const taskSection = document.querySelector(".tasks-section");

function addTask(task, taskSection) {
    let timedate = (new Date()).toString();
    timedate = timedate.substring(0, timedate.length-30);
    const taskCard = document.createElement("div");
    taskCard.setAttribute("class", "tasks p-3 my-2");
    taskCard.setAttribute("id", timedate);

    const currentTime = document.createElement("p");
    currentTime.setAttribute("class", "current-time");
    currentTime.innerText = timedate;
    const taskDescription = document.createElement("p");
    taskDescription.setAttribute("class", "task-description");
    taskDescription.innerText = task;
    let addedTasks = JSON.parse(localStorage.getItem("todoTasks") || "{}");
    addedTasks[timedate] = task;
    localStorage.setItem("todoTasks", JSON.stringify(addedTasks));
    taskCard.append(currentTime, taskDescription);

    const editDeleteCompleteBtn = document.createElement("div");
    const editBtn = document.createElement("button");
    editBtn.setAttribute("class", "edit-btn mx-1 text-white");
    editBtn.innerText = "Edit";
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "delete-btn mx-1 text-white");
    deleteBtn.innerText = "Delete";
    const completeBtn = document.createElement("button");
    completeBtn.setAttribute("class", "complete-btn mx-1 text-white");
    completeBtn.innerText = "Complete";
    editDeleteCompleteBtn.append(editBtn, deleteBtn, completeBtn);

    taskCard.append(editDeleteCompleteBtn);
    taskSection.append(taskCard);
}

addBtn.addEventListener("click", () => {
    if (inputField.value === "") {
        alert("Add Something!");
        return;
    }
    addTask(inputField.value, taskSection);
    inputField.value = "";
});
