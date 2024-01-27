import linkTemplate from "../templates/link.hbs";
const addBtn = document.querySelector(".link-btn")
const addInput = document.querySelector(".link-input")
addBtn.addEventListener("click", onAdd)
function markup(linkList) {
    const list = document.querySelector(".link-list");
    list.innerHTML = linkTemplate({ linkList });
    const delBtn = document.querySelector(".del-btn")
    const editBtn = document.querySelector(".edit-btn")
    // delBtn.addEventListener("click", onDel);
    // editBtn.addEventListener("click", onEdit);
}
function onAdd(e) {
    if (!localStorage.getItem("links")) {
        localStorage.setItem("links", "[]")
    }
    const linkList = JSON.parse(localStorage.getItem("links"))
    const newLink = addInput.value
        linkList.push(newLink)
        markup(linkList)
        localStorage.setItem("links", linkList)
        addInput.value = ""   
}