import { Task, Status } from "./types";
import { loadFromStorage, saveToStorage } from "./storage";
import "./style.css";

// === Konstanta storage key (string) ===
const STORAGE_KEY: string = "todo-kuliah-tasks";

// === Array: Task[] — daftar semua tugas ===
let tasks: Task[] = loadFromStorage<Task>(STORAGE_KEY);

// === Variabel edit state (number | null) ===
let editingId: number | null = null;

// Ambil elemen DOM
const form = document.getElementById("task-form") as HTMLFormElement;
const inputJudul = document.getElementById("input-judul") as HTMLInputElement;
const inputMatkul = document.getElementById("input-matkul") as HTMLInputElement;
const inputDeadline = document.getElementById("input-deadline") as HTMLInputElement;
const btnSubmit = document.getElementById("btn-submit") as HTMLButtonElement;
const taskListEl = document.getElementById("task-list") as HTMLDivElement;

// === Environment variables via import.meta.env ===
const appName: string = import.meta.env.VITE_APP_NAME || "Todo Kuliah";
const appVersion: string = import.meta.env.VITE_APP_VERSION || "1.0.0";

// Tampilkan info app di header & footer
const appInfo = document.getElementById("app-info");
if (appInfo) appInfo.textContent = `${appName} v${appVersion}`;
const footerInfo = document.getElementById("footer-info");
if (footerInfo) footerInfo.textContent = `${appName} v${appVersion} — dibuat dengan ❤️ dan TypeScript`;

// === Fungsi untuk generate ID unik (number) ===
function generateId(): number {
  return Date.now();
}

// === Fungsi render daftar tugas ===
function renderTasks(): void {
  taskListEl.innerHTML = "";

  if (tasks.length === 0) {
    taskListEl.innerHTML = '<p class="empty-state">Belum ada tugas. Tambahkan tugas pertamamu! 🎉</p>';
    return;
  }

  tasks.forEach((task: Task) => {
    const card = document.createElement("div");
    card.className = `task-card ${task.selesai ? "done" : ""}`;

    // Format deadline
    const deadlineDate = new Date(task.deadline);
    const formattedDeadline: string = deadlineDate.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Cek apakah deadline sudah lewat (boolean)
    const isOverdue: boolean = !task.selesai && deadlineDate < new Date();

    card.innerHTML = `
      <div class="task-header">
        <h3 class="task-judul">${task.judul}</h3>
        <span class="task-status ${task.selesai ? "status-selesai" : "status-belum"}"
              data-id="${task.id}" role="button" tabindex="0">
          ${task.status}
        </span>
      </div>
      <p class="task-matkul">📖 ${task.matkul}</p>
      <p class="task-deadline ${isOverdue ? "overdue" : ""}">
        📅 ${formattedDeadline} ${isOverdue ? "⚠️ Terlambat!" : ""}
      </p>
      <div class="task-actions">
        <button class="btn-edit" data-id="${task.id}">✏️ Edit</button>
        <button class="btn-delete" data-id="${task.id}">🗑️ Hapus</button>
      </div>
    `;

    taskListEl.appendChild(card);
  });

  // Event listener: toggle status
  document.querySelectorAll(".task-status").forEach((el) => {
    el.addEventListener("click", () => {
      const id: number = Number((el as HTMLElement).dataset.id);
      toggleStatus(id);
    });
  });

  // Event listener: edit
  document.querySelectorAll(".btn-edit").forEach((el) => {
    el.addEventListener("click", () => {
      const id: number = Number((el as HTMLElement).dataset.id);
      startEdit(id);
    });
  });

  // Event listener: hapus
  document.querySelectorAll(".btn-delete").forEach((el) => {
    el.addEventListener("click", () => {
      const id: number = Number((el as HTMLElement).dataset.id);
      deleteTask(id);
    });
  });
}

// === Toggle status tugas (union type: Status) ===
function toggleStatus(id: number): void {
  tasks = tasks.map((task: Task) => {
    if (task.id === id) {
      const newStatus: Status = task.selesai ? "Belum Selesai" : "Selesai";
      return { ...task, selesai: !task.selesai, status: newStatus };
    }
    return task;
  });
  saveToStorage<Task>(STORAGE_KEY, tasks);
  renderTasks();
}

// === Tambah tugas baru ===
function addTask(judul: string, matkul: string, deadline: string): void {
  const newTask: Task = {
    id: generateId(),
    judul,
    matkul,
    deadline,
    status: "Belum Selesai",
    selesai: false,
  };
  tasks.push(newTask);
  saveToStorage<Task>(STORAGE_KEY, tasks);
  renderTasks();
}

// === Edit tugas ===
function startEdit(id: number): void {
  const task: Task | undefined = tasks.find((t: Task) => t.id === id);
  if (!task) return;

  editingId = id;
  inputJudul.value = task.judul;
  inputMatkul.value = task.matkul;
  inputDeadline.value = task.deadline;
  btnSubmit.textContent = "💾 Simpan Perubahan";
  inputJudul.focus();
}

function updateTask(id: number, judul: string, matkul: string, deadline: string): void {
  tasks = tasks.map((task: Task) => {
    if (task.id === id) {
      return { ...task, judul, matkul, deadline };
    }
    return task;
  });
  saveToStorage<Task>(STORAGE_KEY, tasks);
  renderTasks();
}

// === Hapus tugas ===
function deleteTask(id: number): void {
  if (!confirm("Yakin ingin menghapus tugas ini?")) return;
  tasks = tasks.filter((task: Task) => task.id !== id);
  saveToStorage<Task>(STORAGE_KEY, tasks);
  renderTasks();
}

// === Form submit handler ===
form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const judul: string = inputJudul.value.trim();
  const matkul: string = inputMatkul.value.trim();
  const deadline: string = inputDeadline.value;

  if (!judul || !matkul || !deadline) return;

  if (editingId !== null) {
    updateTask(editingId, judul, matkul, deadline);
    editingId = null;
    btnSubmit.textContent = "Tambah Tugas";
  } else {
    addTask(judul, matkul, deadline);
  }

  form.reset();
});

// Render awal
renderTasks();
