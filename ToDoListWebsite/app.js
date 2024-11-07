let tasks = [];

// Ambil elemen DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Fungsi untuk menyimpan tugas ke localStorage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fungsi untuk memuat tugas dari localStorage
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

// Fungsi untuk menambahkan tugas baru (Create)
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push({
            id: Date.now(),
            text: taskText,
            completed: false
        });
        taskInput.value = '';
        saveTasksToLocalStorage();
        renderTasks();
    }
}

// Fungsi untuk mengubah status penyelesaian tugas
function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    task.completed = !task.completed;
    saveTasksToLocalStorage();
    renderTasks();
}

// Fungsi untuk menampilkan tugas
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        li.innerHTML = `
            <label class="custom-checkbox task-checkbox">
                <input type="checkbox" 
                       ${task.completed ? 'checked' : ''} 
                       onchange="toggleTaskCompletion(${task.id})">
                <span class="checkmark"></span>
            </label>
            <span class="task-text ${task.completed ? 'task-completed' : ''}">${task.text}</span>
            <div class="task-actions">
                <button class="edit-btn" onclick="editTask(${task.id})">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Fungsi untuk mengedit tugas (Update)
function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    const newText = prompt('Edit task:', task.text);
    if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        saveTasksToLocalStorage();
        renderTasks();
    }
}

// Fungsi untuk menghapus tugas (Delete)
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasksToLocalStorage();
    renderTasks();
}

// Event Listener untuk tombol Tambah Tugas
addTaskBtn.addEventListener('click', addTask);

// Event Listener untuk input keyboard
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Memuat tugas saat halaman dimuat
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);