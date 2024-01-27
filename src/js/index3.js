import linkTemplate from "../templates/link.hbs";
const addBtn = document.querySelector(".link-btn")
const addInput = document.querySelector(".link-input")
const list = document.querySelector(".link-list");
addBtn.addEventListener("click", onAdd)
function markup(linkList) {
    list.innerHTML = linkTemplate({ linkList });
    const delBtn = document.querySelector(".del-btn")
    const editBtn = document.querySelector(".edit-btn")
    list.addEventListener("click", onDel);
    list.addEventListener("click", onEdit);
}
markup(JSON.parse(localStorage.getItem("links")))
function onAdd(e) {
    if (!localStorage.getItem("links")) {
        localStorage.setItem("links", "[]")
    }
    const linkList = JSON.parse(localStorage.getItem("links"))
    const newLink = addInput.value
    if (newLink) {
        linkList.push(newLink)
        localStorage.setItem("links", JSON.stringify(linkList))
        markup(linkList)
        addInput.value = ''
    }
}
function onDel(e) {
    if (e.target.nodeName === "BUTTON" && e.target.hasAttribute("data-delete")) {
        const delIndex = e.target.dataset.delete
        const linkList = JSON.parse(localStorage.getItem("links"))
        linkList.splice(delIndex, 1)
        localStorage.setItem("links", JSON.stringify(linkList))
        markup(linkList)
    }
}
function onEdit(e) {
    if (e.target.nodeName === "BUTTON" && e.target.hasAttribute("data-edit")) {
        const newLink = prompt("Enter new name")
        const editIndex = e.target.dataset.edit
        const linkList = JSON.parse(localStorage.getItem("links"))
        linkList.splice(editIndex, 1, newLink)
        localStorage.setItem("links", JSON.stringify(linkList))
        markup(linkList)
    }
}