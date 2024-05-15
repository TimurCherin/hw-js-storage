import { v4 as uuidv4 } from "uuid";
import classes from "./css/style.css";
import listTemplate from "./templates/template.hbs";
import linkTemplate from "./templates/link.hbs";
import templateContact from "./templates/contactTemplate.hbs";

// task 1
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
    id: uuidv4(),
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
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }
}
// task 2
const submitForm = document.querySelector(".submit-form");
const submitName = document.querySelector("[name='name'");
const submitPassword = document.querySelector("[name='password'");
const userForm = document.querySelector(".user-form");
const submitBtn = document.querySelector(".submit-button");
const userBtn = document.querySelector(".user-button");
if (localStorage.getItem("info")) {
  const data = JSON.parse(localStorage.getItem("info"));
  submitName.value = data.name;
  submitPassword.value = data.password;
}

submitForm.addEventListener("submit", onSubmit);
function onSubmit(e) {
  e.preventDefault();
  const data = e.currentTarget.elements;
  const name = data.name.value;
  const password = data.password.value;
  const currentInfo = {
    name,
    password,
  };
  if (localStorage.getItem("info")) {
    const parsedData = JSON.parse(localStorage.getItem("info"));
    const newData = { ...parsedData, ...currentInfo };
    const info = JSON.stringify(newData);
    localStorage.setItem("info", info);
  } else {
    const info = JSON.stringify(currentInfo);
    localStorage.setItem("info", info);
  }
  submitForm.reset();
}

userForm.addEventListener("submit", onUserSubmit);
function onUserSubmit(e) {
  e.preventDefault();
  const data = e.currentTarget.elements;
  const name = data.userName.value;
  const password = data.userPassword.value;
  const currentInfo = {
    name,
    password,
  };
  if (!localStorage.getItem("userInfo")) {
    localStorage.setItem("userInfo", "[]");
  }
  const parsedData = JSON.parse(localStorage.getItem("userInfo"));
  const nameArray = parsedData.map((obj) => obj.name);
  const passwordArray = parsedData.map((obj) => obj.password);
  if (nameArray.includes(name)) {
    if (passwordArray.includes(password)) {
      alert(`Привіт ${name} раді знову вас бачити`);
      userForm.reset();
    } else {
      alert("Ви ввели не вірний пароль");
    }
  } else {
    alert(`Привіт ${name} ви наш новий користувач`);
    parsedData.push(currentInfo);
    localStorage.setItem("userInfo", JSON.stringify(parsedData));
    userForm.reset();
  }
}
// task 3
const addBtn = document.querySelector(".link-btn");
const addInput = document.querySelector(".link-input");
const list = document.querySelector(".link-list");
addBtn.addEventListener("click", onAdd1);
function markup1(linkList) {
  list.innerHTML = linkTemplate({ linkList });
  const delBtn = document.querySelector(".del-btn");
  const editBtn = document.querySelector(".edit-btn");
  list.addEventListener("click", onDel);
  list.addEventListener("click", onEdit1);
}
markup1(JSON.parse(localStorage.getItem("links")));
function onAdd1(e) {
  if (!localStorage.getItem("links")) {
    localStorage.setItem("links", "[]");
  }
  const linkList = JSON.parse(localStorage.getItem("links"));
  const newLink = addInput.value;
  if (newLink) {
    linkList.push(newLink);
    localStorage.setItem("links", JSON.stringify(linkList));
    markup1(linkList);
    addInput.value = "";
  }
}
function onDel(e) {
  if (e.target.nodeName === "BUTTON" && e.target.hasAttribute("data-delete")) {
    const delIndex = e.target.dataset.delete;
    const linkList = JSON.parse(localStorage.getItem("links"));
    linkList.splice(delIndex, 1);
    localStorage.setItem("links", JSON.stringify(linkList));
    markup1(linkList);
  }
}
function onEdit1(e) {
  if (e.target.nodeName === "BUTTON" && e.target.hasAttribute("data-edit")) {
    const newLink = prompt("Enter new name");
    const editIndex = e.target.dataset.edit;
    const linkList = JSON.parse(localStorage.getItem("links"));
    linkList.splice(editIndex, 1, newLink);
    localStorage.setItem("links", JSON.stringify(linkList));
    markup1(linkList);
  }
}
// task 4
const wrap = document.querySelector(".wrap");
const nameOfInput = document.querySelector(".name-input");
const lastnameOfInput = document.querySelector(".lastname-input");
const phoneOfInput = document.querySelector(".phone-input");
const emailOfInput = document.querySelector(".email-input");
wrap.addEventListener("click", onDel1);
wrap.addEventListener("click", onEdit2);
const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", closeModal);
function markup2(contacts) {
  wrap.innerHTML = templateContact({ contacts });
  const tbody = document.querySelector(".tbody");
}
if (localStorage.getItem("contacts")) {
  const contacts = JSON.parse(localStorage.getItem("contacts"));
  markup2(contacts);
}
const form = document.querySelector(".contact-form");
form.addEventListener("submit", onAdd2);

function onAdd2(e) {
  e.preventDefault();
  const data = e.currentTarget.elements;
  const name = data.name.value;
  const lastName = data.lastName.value;
  const phone = data.phone.value;
  const email = data.email.value;
  const newContact = {
    id: 3,
    name: name,
    lastName: lastName,
    phone: phone,
    email: email,
  };
  if (!localStorage.getItem("contacts")) {
    localStorage.setItem("contacts", "[]");
  }
  const contacts = JSON.parse(localStorage.getItem("contacts"));
  contacts.push(newContact);
  markup2(contacts);
  form.reset();
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function onDel1(e) {
  if (e.target.nodeName === "BUTTON" && e.target.hasAttribute("data-delId")) {
    const delId = e.target.dataset.delid;
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    const index = contacts.map((contact) => contact.id).indexOf(delId);
    contacts.splice(index, 1);
    markup2(contacts);
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
}
const modal = document.querySelector(".backdrop");
const modalForm = document.querySelector(".modal-form");
function onEdit2(e) {
  if (e.target.nodeName === "BUTTON" && e.target.hasAttribute("data-editId")) {
    const editId = e.target.dataset.editid;
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    const editIndex = contacts.map((contact) => contact.id).indexOf(editId);
    const editedContact = contacts[editIndex];
    nameOfInput.value = editedContact.name;
    lastnameOfInput.value = editedContact.lastName;
    phoneOfInput.value = editedContact.phone;
    emailOfInput.value = editedContact.email;
    modal.classList.remove("hide");
    modalForm.addEventListener("submit", onEditContact);
    function onEditContact(e) {
      e.preventDefault();
      const data = e.currentTarget.elements;
      const name = data.name.value;
      const lastName = data.lastName.value;
      const phone = data.phone.value;
      const email = data.email.value;
      const newContact = {
        name,
        lastName,
        phone,
        email,
      };
      contacts[editIndex] = { ...contacts[editIndex], ...newContact };
      markup2(contacts);
      modalForm.reset();
      modal.classList.add("hide");
      localStorage.setItem("contacts", JSON.stringify(contacts));
      modalForm.removeEventListener("submit", onEditContact);
    }
  }
}
function closeModal() {
  modal.classList.add("hide");
}
