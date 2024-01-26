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
    console.log(newData);
  } else {
    const info = JSON.stringify(currentInfo);
    localStorage.setItem("info", info);
  }
  submitForm.reset();
}

userForm.addEventListener("submit", onUserSubmit)
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
  const nameArray = parsedData.map(obj => obj.name)
  const passwordArray = parsedData.map(obj => obj.password)
  if (nameArray.includes(name)) {
    if (passwordArray.includes(password)) {
      alert(`Привіт ${name} раді знову вас бачити`)
    } else {
      alert("Ви ввели не вірний пароль")
    }
  } else {
    alert(`Привіт ${name} ви наш новий користувач`)
    parsedData.push(currentInfo)
    localStorage.setItem("userInfo", JSON.stringify(parsedData));
    userForm.reset();
  }
}
