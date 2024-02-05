import listTemplate from "../templates/template.hbs";
import { nanoid } from "nanoid";
const addItem = document.querySelector(".addItem");
const addItemBtn = document.querySelector(".addItemBtn");
function markup(taskList) {
  const list = document.querySelector(".todo-list");
  list.innerHTML = listTemplate({ taskList });
  list.addEventListener("click", onEdit);
}
if (localStorage.getItem("taskList")) {
  const taskList = JSON.parse(localStorage.getItem("taskList"));
  markup(taskList);
}
addItemBtn.addEventListener("click", onAddTask);
function onAddTask(e) {
  if (!localStorage.getItem("taskList")) {
    localStorage.setItem("taskList", "[]");
  }
  const taskList = JSON.parse(localStorage.getItem("taskList"));
  const currentTask = addItem.value;
  if (!currentTask) {
    return;
  }
  const newTask = {
    id: nanoid(),
    task: currentTask,
    status: false,
  };
  taskList.push(newTask);
  addItem.value = "";
  markup(taskList);
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

function onEdit(e) {
  if (e.target.nodeName === "BUTTON" && e.target.hasAttribute("data-id")) {
    const editId = e.target.dataset.id;
    const taskList = JSON.parse(localStorage.getItem("taskList"));
    const editIndex = taskList.map((ts) => ts.id).indexOf(editId);
    if (taskList[editIndex].status) {
      taskList[editIndex].status = false;
    } else {
      taskList[editIndex].status = true;
    }
    markup(taskList);
    localStorage.setItem("taskList", JSON.stringify(taskList))
  }
}
