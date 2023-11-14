    const input = document.getElementById("input");
    const taskList = document.getElementById("container");
    const completedTaskList = document.getElementById("completed");
    const importantTaskList = document.getElementById("important");

    function add() {
        if (input.value === '') {
            alert("You must write something!");
        } else {
            const listItem = document.createElement("li");
            listItem.innerHTML = input.value;
            taskList.appendChild(listItem);

            const closeButton = document.createElement("span");
            closeButton.innerHTML = "\u00d7";
            listItem.appendChild(closeButton);

            const importantButton = document.createElement("p");
            importantButton.innerHTML = "\u002a";
            listItem.appendChild(importantButton);
        }
        input.value = "";
        saveData();
    }

    function handleTaskClick(e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("check");
            if (e.target.classList.contains("check")) {
                completedTaskList.appendChild(e.target);
            } else {
                taskList.appendChild(e.target);
            }
            saveData();
        } else if (e.target.tagName === "SPAN") {
            if (e.target.innerHTML === "\u00d7") {
                e.target.parentElement.remove();
            }
        }
        else if(e.target.tagName === "P"){
            if (e.target.innerHTML === "\u002a") {
                e.target.parentElement.classList.toggle("important");
                if (e.target.parentElement.classList.contains("important")) {
                    importantTaskList.appendChild(e.target.parentElement);
                } else {
                    taskList.appendChild(e.target.parentElement);
                }
            }
            saveData();
        }
    }

    function saveData() {
        localStorage.setItem("taskList", taskList.innerHTML);
        localStorage.setItem("completedTaskList", completedTaskList.innerHTML);
        localStorage.setItem("importantTaskList", importantTaskList.innerHTML);
    }

    function show() {
        const savedTaskList = localStorage.getItem("taskList");
        if (savedTaskList) {
            taskList.innerHTML = savedTaskList;
        }

        const savedCompletedTaskList = localStorage.getItem("completedTaskList");
        if (savedCompletedTaskList) {
            completedTaskList.innerHTML = savedCompletedTaskList;
        }

        const savedImportantTaskList = localStorage.getItem("importantTaskList");
        if (savedImportantTaskList) {
            importantTaskList.innerHTML = savedImportantTaskList;
        }
    }

    taskList.addEventListener("click", handleTaskClick, false);
    completedTaskList.addEventListener("click", handleTaskClick, false);
    importantTaskList.addEventListener("click", handleTaskClick, false);

    show();
    