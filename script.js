const tasksBox = document.getElementById("tasks");
const toggleTask = document.getElementById("newtask");
const titleInput = document.getElementById("title");

const completedBtn = document.getElementById("completed");
const uncompletedBtn = document.getElementById("uncompleted");

let id = 0;

function AddTask() {
  id++;

  const task = `
    <div class="task" id="task-${id}">
      <div class="content">
        <h3 class="task-title">${titleInput.value.trim()}</h3>
        <button class="done" title="Complete"><i class="fas fa-check"></i></button>
        <button class="edit" title="Edit"><i class="fas fa-pen"></i></button>
        <button class="remove" title="Remove"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `;

  tasksBox.insertAdjacentHTML("beforeend", task);
  Toggle(toggleTask);

  titleInput.value = "";
}

tasksBox.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  const box = btn?.closest(".task");
  if (!box) return;

  const area = box.querySelector(".content");

  if (btn.classList.contains("done")) {
    box.style.backgroundColor = "#28a745";
    btn.innerHTML = `<i class="fas fa-rotate-left"></i>`;
    btn.title = "Undo";
    btn.classList.remove("done");
    btn.classList.add("undo");

    const editBtn = box.querySelector(".edit");
    if (editBtn) editBtn.style.display = "none";
  } else if (btn.classList.contains("undo")) {
    box.style.backgroundColor = "";
    btn.innerHTML = `<i class="fas fa-check"></i>`;
    btn.title = "Complete";
    btn.classList.remove("undo");
    btn.classList.add("done");

    const editBtn = box.querySelector(".edit");
    if (editBtn) editBtn.style.display = "inline-block";
  } else if (btn.classList.contains("edit")) {
    const oldTitle = box.querySelector(".task-title").textContent;

    area.innerHTML = `
      <input class="edit-title" value="${oldTitle}" />
      <button class="update" title="Update"><i class="fas fa-check"></i></button>
      <button class="cancel" title="Cancel"><i class="fas fa-times"></i></button>
    `;
  } else if (btn.classList.contains("update")) {
    const newTitle = box.querySelector(".edit-title").value.trim();
    restore(box, newTitle);
  } else if (btn.classList.contains("cancel")) {
    const title = box.querySelector(".edit-title").value;
    restore(box, title);
  } else if (btn.classList.contains("remove")) {
    box.remove();
  }
});

function restore(box, title) {
  box.querySelector(".content").innerHTML = `
    <h3 class="task-title">${title}</h3>
    <button class="done" title="Complete"><i class="fas fa-check"></i></button>
    <button class="edit" title="Edit"><i class="fas fa-pen"></i></button>
    <button class="remove" title="Remove"><i class="fas fa-trash"></i></button>
  `;
}

function Toggle(el) {
  if (el.style.display === "none" || el.style.display === "") {
    el.style.display = "block";
  } else {
    el.style.display = "none";
  }
}

let showCompletedOnly = false;
let showUncompletedOnly = false;

completedBtn.addEventListener("click", () => {
  showCompletedOnly = !showCompletedOnly;
  showUncompletedOnly = false;

  document.querySelectorAll(".task").forEach((task) => {
    const isDone = task.querySelector(".undo");
    task.style.display = showCompletedOnly
      ? isDone
        ? "block"
        : "none"
      : "block";
  });
});

uncompletedBtn.addEventListener("click", () => {
  showUncompletedOnly = !showUncompletedOnly;
  showCompletedOnly = false;

  document.querySelectorAll(".task").forEach((task) => {
    const isDone = task.querySelector(".done");
    task.style.display = showUncompletedOnly
      ? isDone
        ? "block"
        : "none"
      : "block";
  });
});
