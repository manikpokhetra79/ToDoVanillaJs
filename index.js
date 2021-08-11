let taskInput = document.querySelector(".taskinput input");
let taskCategory = document.querySelector(".taskinput select");
console.log(taskCategory);
let addBtn = document.querySelector(".taskinput button");
let todoList = document.querySelector('.todoList')
let clearAll = document.querySelector('.delete-btn');

renderTasks(); 

addBtn.onclick = () => {
    let taskValue = taskInput.value;
    let taskCatValue = taskCategory.value;
    
    console.log(taskCatValue);
    //add task to local storage
    let localStorageData = localStorage.getItem("Task");
    if(localStorageData == null){
        tasksList = []; //create empty array
    }else{ 
        //JSON.parse parses a JSON string and converts to object
        tasksList = JSON.parse(localStorageData);
    }
    tasksList.push(taskValue); //push new task to array
    // JSON.stringify >> Create a JSON string from a JavaScript object.
    let newList = JSON.stringify(tasksList);
    localStorage.setItem("Task", JSON.stringify(tasksList));
    renderTasks();
    addBtn.classList.remove("active");
   
}
function renderTasks(){
    let localStorageData = localStorage.getItem("Task");
    if(localStorageData == null){
        tasksList = []; 
    }else{
        tasksList = JSON.parse(localStorageData); 
        // console.log(tasksList);
    }
    let pendingTasks = document.querySelector('.pendingTasks');
    pendingTasks.textContent = tasksList.length;
    //use classlist api to add or remove class
    if (tasksList.length > 0) { 
        clearAll.classList.add("active"); 
    } else {
        clearAll.classList.remove("active"); 
    }

    let li = "";
    tasksList.forEach((element,index) => {
        console.log(element);
        li += `<li class="list-group-item">${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = li;
    taskInput.value = "";
}

function deleteTask(index){
    let localStorageData = localStorage.getItem("Task");
    tasksList = JSON.parse(localStorageData); 
    tasksList.splice(index,1);
    //set updated array to localStorage
    localStorage.setItem("Task", JSON.stringify(tasksList));
    renderTasks();
}


clearAll.onclick = () => {
    tasksList = []; 
    localStorage.setItem("Task", JSON.stringify(tasksList)); //set the item in localstorage
    renderTasks(); //calling the function
}