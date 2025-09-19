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

function filterTasks() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const tasks = document.querySelectorAll('.task-card');

    tasks.forEach(task => {
        const taskText = task.textContent.toLowerCase();
        if (taskText.includes(searchText)) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

function showAllTasks() {
    const tasks = document.querySelectorAll('.task-card');
    tasks.forEach(task => task.style.display = 'block');
}

function showCompleted() {
    const tasks = document.querySelectorAll('.task-card');
    tasks.forEach(task => {
        if (task.classList.contains('completed')) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

function showNotCompleted() {
    const tasks = document.querySelectorAll('.task-card');
    tasks.forEach(task => {
        if (!task.classList.contains('completed')) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

// Закрытие popup при клике вне его области
document.addEventListener('click', function(event) {
    const profilePopup = document.getElementById('profilePopup');
    const editPopup = document.getElementById('editTaskPopup');

    if (!profilePopup.classList.contains('hidden') &&
        event.target === profilePopup) {
        closeProfilePopup();
    }

    if (!editPopup.classList.contains('hidden') &&
        event.target === editPopup) {
        closeEditPopup();
    }
});

// Обработка нажатия ESC для закрытия popup
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProfilePopup();
        closeEditPopup();
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
