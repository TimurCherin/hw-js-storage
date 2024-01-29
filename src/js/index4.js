import templateContact from '../templates/contactTemplate.hbs';
import { nanoid } from 'nanoid'
const wrap = document.querySelector(".wrap")
wrap.addEventListener("click", onDel)
wrap.addEventListener("click", onEdit)
const closeBtn = document.querySelector(".close-btn")
closeBtn.addEventListener("click", closeModal)
function markup(contacts) {
    wrap.innerHTML = templateContact({ contacts });
    const tbody = document.querySelector(".tbody")
}
if (localStorage.getItem("contacts")) {
    const contacts = JSON.parse(localStorage.getItem("contacts"))
    markup(contacts)   
}   
const form = document.querySelector(".contact-form")
form.addEventListener("submit", onAdd)

function onAdd(e) {
    e.preventDefault()
    const data = e.currentTarget.elements
    const name = data.name.value
    const lastName = data.lastName.value
    const phone = data.phone.value
    const email = data.email.value
    const newContact = {
        id: nanoid(),
        name: name,
        lastName: lastName,
        phone: phone,
        email: email,
    }
    if (!localStorage.getItem("contacts")) {
        localStorage.setItem("contacts", "[]")
    }
    const contacts = JSON.parse(localStorage.getItem("contacts"))
    contacts.push(newContact)
    markup(contacts)
    form.reset()
    localStorage.setItem("contacts", JSON.stringify(contacts))
}

function onDel(e) {
    if (e.target.nodeName === "BUTTON" && e.target.hasAttribute("data-delId")) {
        const delId = e.target.dataset.delid
        const contacts = JSON.parse(localStorage.getItem("contacts"))
        const index = contacts.map(contact => contact.id).indexOf(delId)
        contacts.splice(index, 1)
        markup(contacts)
        localStorage.setItem("contacts", JSON.stringify(contacts))
    }
}
const modal = document.querySelector(".backdrop")
const modalForm = document.querySelector(".modal-form")
function onEdit(e) {
    if (e.target.nodeName === "BUTTON" && e.target.hasAttribute("data-editId")) {
        const editId = e.target.dataset.editid
        const contacts = JSON.parse(localStorage.getItem("contacts"))
        const editIndex = contacts.map(contact => contact.id).indexOf(editId)
        modal.classList.remove("hide")
        modalForm.addEventListener("submit", onEditContact)
function onEditContact(e) {
    e.preventDefault()
    const data = e.currentTarget.elements
    const name = data.name.value
    const lastName = data.lastName.value
    const phone = data.phone.value
    const email = data.email.value
    const newContact = {}
    name ? newContact.name = name : ""
    lastName ? newContact.lastName = lastName : ""
    phone ? newContact.phone = phone : ""
    email ? newContact.email = email : ""
    contacts[editIndex] = { ...contacts[editIndex], ...newContact }
    markup(contacts)
    modalForm.reset()
    modal.classList.add("hide")
    localStorage.setItem("contacts", JSON.stringify(contacts))
    modalForm.removeEventListener("submit", onEditContact);
}
    }
}
function closeModal() {
    modal.classList.add("hide")
}