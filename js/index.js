if (localStorage.getItem("tasks") === null) {
  localStorage.setItem("tasks", JSON.stringify([]))
}

const input = document.querySelector("#taskInput")
const form = document.querySelector("#taskForm")
const tasksContainer = document.querySelector(".tasks")
const navbar = document.querySelector(".navbar")

function renderTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"))

  if (savedTasks.length <= 0) {
    tasksContainer.innerHTML = `<h1 class="text-center">No Tasks For Now</h1>`
    return
  }

  tasksContainer.innerHTML = ""
  savedTasks.forEach((task, index) => {
    tasksContainer.innerHTML += `
      <div class="task border rounded d-flex justify-content-between align-items-center p-3">
        <p class="m-0">${task}</p>
        <button type="button" class="delete-btn btn-solid theme-danger">Delete</button>
      </div>
    `
  })
}

tasksContainer.addEventListener("click", ev => {
  const btn = ev.target
  if (!btn.classList.contains("delete-btn")) {
    return
  }
  const content = btn.closest(".task").querySelector("p").textContent
  let savedTasks = JSON.parse(localStorage.getItem("tasks"))

  savedTasks = savedTasks.filter(task => task !== content)
  localStorage.setItem("tasks", JSON.stringify(savedTasks))

  renderTasks()
})

form.addEventListener("submit", (ev) => {
  ev.preventDefault()

  const value = input.value
  if (!value) return

  const savedTasks = JSON.parse(localStorage.getItem("tasks"))
  savedTasks.push(value)
  localStorage.setItem("tasks", JSON.stringify(savedTasks))

  input.value = ""
  renderTasks()
})
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.setAttribute("class", "navbar md:navbar-expand bg-primary");
  } else {
    navbar.setAttribute("class", "navbar md:navbar-expand bg-1");
  }
})
renderTasks()