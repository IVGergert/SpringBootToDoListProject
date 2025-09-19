// ==================== POPUPS ====================
function openProfilePopup() {
    document.getElementById('profilePopup').classList.remove('hidden');
}

function closeProfilePopup() {
    document.getElementById('profilePopup').classList.add('hidden');
}

function openEditPopup(button) {
    const taskId = button.getAttribute('data-task-id');
    const taskName = button.getAttribute('data-task-name');
    const taskDescription = button.getAttribute('data-task-description');
    const taskDeadline = button.getAttribute('data-task-deadline');

    document.getElementById('editTaskId').value = taskId;
    document.getElementById('editTaskName').value = taskName;
    document.getElementById('editTaskDescription').value = taskDescription;
    document.getElementById('editTaskDeadline').value = taskDeadline;

    const form = document.getElementById("editTaskForm");
    form.action = `/tasks/update/${taskId}`;

    document.getElementById('editTaskPopup').classList.remove('hidden');
}

function closeEditPopup() {
    document.getElementById('editTaskPopup').classList.add('hidden');
}

// ==================== ФИЛЬТРЫ ====================
function filterTasks() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const tasks = document.querySelectorAll('.task-card');

    tasks.forEach(task => {
        const taskText = task.textContent.toLowerCase();
        task.style.display = taskText.includes(searchText) ? 'block' : 'none';
    });
}

function showAllTasks() {
    document.querySelectorAll('.task-card').forEach(task => task.style.display = 'block');
}

function showCompleted() {
    document.querySelectorAll('.task-card').forEach(task => {
        task.style.display = task.classList.contains('completed') ? 'block' : 'none';
    });
}

function showNotCompleted() {
    document.querySelectorAll('.task-card').forEach(task => {
        task.style.display = !task.classList.contains('completed') ? 'block' : 'none';
    });
}

// ==================== КАСТОМНОЕ ПОДТВЕРЖДЕНИЕ ====================
let confirmCallback = null;

function openConfirmPopup(message, callback) {
    document.getElementById('confirmMessage').textContent = message;
    document.getElementById('confirmPopup').classList.remove('hidden');
    confirmCallback = callback;
}

function closeConfirmPopup() {
    document.getElementById('confirmPopup').classList.add('hidden');
    confirmCallback = null;
}

document.getElementById('confirmYes').addEventListener('click', () => {
    if (confirmCallback) confirmCallback(true);
    closeConfirmPopup();
});

document.getElementById('confirmNo').addEventListener('click', () => {
    if (confirmCallback) confirmCallback(false);
    closeConfirmPopup();
});

// ==================== ДЛЯ УДАЛЕНИЯ И ВЫХОДА ====================
function handleDelete(event, form) {
    event.preventDefault();
    openConfirmPopup("Вы уверены, что хотите удалить эту задачу?", (result) => {
        if (result) form.submit();
    });
    return false;
}

function handleLogout(event, form) {
    event.preventDefault();
    openConfirmPopup("Вы уверены, что хотите выйти из аккаунта?", (result) => {
        if (result) form.submit();
    });
    return false;
}

// ==================== ДЛЯ РЕДАКТИРОВАНИЯ ====================
function handleEditTask(event, form) {
    event.preventDefault();
    openConfirmPopup("Сохранить изменения задачи?", (result) => {
        if (result) form.submit();
    });
    return false;
}

function handleEditProfile(event, form) {
    event.preventDefault();
    openConfirmPopup("Сохранить изменения профиля?", (result) => {
        if (result) form.submit();
    });
    return false;
}

// ==================== ГЛОБАЛЬНОЕ УПРАВЛЕНИЕ ====================
document.addEventListener('click', function(event) {
    const profilePopup = document.getElementById('profilePopup');
    const editPopup = document.getElementById('editTaskPopup');
    const confirmPopup = document.getElementById('confirmPopup');

    if (!profilePopup.classList.contains('hidden') && event.target === profilePopup) {
        closeProfilePopup();
    }
    if (!editPopup.classList.contains('hidden') && event.target === editPopup) {
        closeEditPopup();
    }
    if (!confirmPopup.classList.contains('hidden') && event.target === confirmPopup) {
        closeConfirmPopup();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProfilePopup();
        closeEditPopup();
        closeConfirmPopup();
    }
});

window.addEventListener("DOMContentLoaded", () => {
    const openProfile = document.body.getAttribute("data-open-profile");
    if (openProfile === "true") {
        openProfilePopup();
    }

    const notifications = document.querySelectorAll('.success-message, .error-message');
    setTimeout(() => {
        notifications.forEach(el => el.classList.add('fade-out'));
    }, 5000);
});
