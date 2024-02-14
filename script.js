const inputField = document.querySelector(".input");
const addBtn = document.querySelector(".add");
const taskSection = document.querySelector(".tasks-section");
const allOptionsBtns = document.querySelectorAll('.option-btn');

const completeShow = document.querySelector('.complete-show');
const activeShow = document.querySelector('.active-show');
const allShow = document.querySelector('.all-show');
const clearCompleted = document.querySelector('.clear-completed');
let allOrActive = "All";
function backgroundChange (buttonName) {
    allOptionsBtns.forEach(ele => {
        ele.style.backgroundColor = "#023047";
    });
    buttonName.style.backgroundColor = "#fca311";
}

function htmlCreation(section, timedate, task, iscomplete) {
    const taskCard = document.createElement("div");
    taskCard.setAttribute("class", "tasks p-3 my-2");
    taskCard.setAttribute("id", timedate);

    const currentTime = document.createElement("p");
    currentTime.setAttribute("class", "current-time");
    currentTime.innerText = timedate;
    const taskDescription = document.createElement("p");
    taskDescription.setAttribute("class", "task-description text-nowrap overflow-scroll");
    taskDescription.setAttribute("data-taskid", timedate);
    taskDescription.innerText = task;
    taskCard.append(currentTime, taskDescription);

    const editDeleteCompleteBtn = document.createElement("div");
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "delete-btn mx-1 text-white");
    deleteBtn.setAttribute("data-deletetimedate", timedate);
    deleteBtn.innerText = "Delete";
    editDeleteCompleteBtn.append(deleteBtn);
    const completeBtn = document.createElement("button");
    completeBtn.setAttribute("class", "complete-btn mx-1 text-white");
    completeBtn.setAttribute("data-completetimedate", timedate);
    completeBtn.innerText = "Complete";
    if(iscomplete) {
        taskDescription.style.textDecorationLine = "line-through";
        completeBtn.innerText = "Completed";
        completeBtn.style.backgroundColor = "#8ac926";
    }
    editDeleteCompleteBtn.appendChild(completeBtn);
    taskCard.appendChild(editDeleteCompleteBtn);
    section.appendChild(taskCard);
}

function addTask(taskSection, taskObj) {
    htmlCreation(taskSection, taskObj.time, taskObj.task, taskObj.iscomplete);
}

function deleteTask(deleteTaskId) {
    let addedTasks = JSON.parse(localStorage.getItem("todoTasks") || "[]");
    const deleteIndex = addedTasks.findIndex(ele => ele.time === deleteTaskId);
    addedTasks.splice(deleteIndex, 1);
    localStorage.setItem("todoTasks", JSON.stringify(addedTasks));
    taskSection.removeChild(document.getElementById(deleteTaskId));
}

function completeTask(completeTaskId) {
    const currentTask = document.getElementById(completeTaskId);
    const completeBtn = currentTask.querySelector('.complete-btn');
    const deleteBtn = currentTask.querySelector('.delete-btn');
    const taskDescription = currentTask.querySelector('.task-description');
    taskDescription.style.textDecorationLine = "line-through";
    completeBtn.style.backgroundColor = "#8ac926";
    completeBtn.innerText = "Completed";
    if(allOrActive === "Active") taskSection.removeChild(currentTask);

    let addedTasks = JSON.parse(localStorage.getItem("todoTasks") || "[]");
    const completeIndex = addedTasks.findIndex(ele => ele.time === completeTaskId);
    addedTasks[completeIndex].iscomplete = true;
    localStorage.setItem("todoTasks", JSON.stringify(addedTasks));
}

addBtn.addEventListener("click", () => {
    let taskText = inputField.value.trim();
    if (taskText === "") {
        alert("Add Something!");
        return;
    }
    let addedTasks = JSON.parse(localStorage.getItem("todoTasks") || "[]");
    let timedate = (new Date()).toString();
    timedate = timedate.substring(0, timedate.length-31);
    let index = addedTasks.findIndex(ele => ele.task === taskText);
    if(index >= 0){
        alert("Task is already added in your todo list.");
        inputField.value = "";
        return;
    }
    else {
        let obj = {
            time : timedate,
            task : taskText,
            iscomplete : false
        }
        addedTasks.push(obj);
        addTask(taskSection, obj);
        localStorage.setItem("todoTasks", JSON.stringify(addedTasks));
    }
    inputField.value = "";
});

taskSection.addEventListener('click', (e) => {
    if(e.target.className.includes("delete-btn")){
        const deleteBtnId = e.target.dataset.deletetimedate;
        const deleteTaskId = deleteBtnId;
        deleteTask(deleteTaskId);
    }
    if(e.target.className.includes("complete-btn")) {
        const completeBtnId = e.target.dataset.completetimedate;
        const completeTaskId = completeBtnId;
        completeTask(completeTaskId);
    }
});

window.addEventListener('load', () => {
    let addedTasks = JSON.parse(localStorage.getItem("todoTasks") || "[]");
    addedTasks.forEach(element => {
        addTask(taskSection, element);
    });
});

inputField.addEventListener('keypress', (e) => {
    if(e.key === "Enter"){
        e.preventDefault();
        addBtn.click();
    }
});

completeShow.addEventListener('click', () => {
    backgroundChange(completeShow);
    taskSection.innerHTML = "";
    let addedTasks = JSON.parse(localStorage.getItem("todoTasks") || "[]");
    addedTasks.forEach(ele => {
        if(ele.iscomplete) htmlCreation(taskSection, ele.time, ele.task, ele.iscomplete);
    })
});

activeShow.addEventListener('click', () => {
    backgroundChange(activeShow);
    allOrActive = "Active";
    taskSection.innerHTML = "";
    let addedTasks = JSON.parse(localStorage.getItem("todoTasks") || "[]");
    addedTasks.forEach(ele => {
        if(!ele.iscomplete) htmlCreation(taskSection, ele.time, ele.task, false);
    });
});


allShow.addEventListener('click', () => {
    backgroundChange(allShow);
    allOrActive = "All";
    taskSection.innerHTML = "";
    let addedTasks = JSON.parse(localStorage.getItem("todoTasks") || "[]");
    addedTasks.forEach(ele => htmlCreation(taskSection, ele.time, ele.task, ele.iscomplete));
});

clearCompleted.addEventListener('click', () => {
    backgroundChange(clearCompleted);
    taskSection.innerHTML = "";
    let addedTasks = JSON.parse(localStorage.getItem("todoTasks") || "[]");
    addedTasks = addedTasks.filter(ele => ele.iscomplete === false);
    localStorage.setItem("todoTasks", JSON.stringify(addedTasks));
})