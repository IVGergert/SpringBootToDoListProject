document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const formTitle = document.getElementById('form-title');

    const loginError = document.getElementById("loginError");
    const registerError = document.getElementById("registerError");

    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");

    const regName = document.getElementById("regName");
    const regSurname = document.getElementById("regSurname");
    const regEmail = document.getElementById("regEmail");
    const regPassword = document.getElementById("regPassword");

    const showLogin = () => {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        loginBtn.classList.add('active');
        registerBtn.classList.remove('active');
        formTitle.textContent = 'Вход';
    };

    const showRegister = () => {
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        registerBtn.classList.add('active');
        loginBtn.classList.remove('active');
        formTitle.textContent = 'Регистрация';
    };

    loginBtn.addEventListener('click', showLogin);
    registerBtn.addEventListener('click', showRegister);

    // Показ сообщений от бэкенда (?error, ?registered, ?logout)
    const params = new URLSearchParams(window.location.search);
    if (params.has('error')) {
        showLogin();
        loginError.textContent = 'Неверный email или пароль.';
        loginError.classList.remove('hidden');
    }
    if (params.has('registered')) {
        showLogin();
        loginError.textContent = 'Регистрация прошла успешно. Войдите с вашими данными.';
        loginError.classList.remove('hidden');
        // Можно добавить класс .success для зелёного текста, если есть стиль
    }
    if (params.has('logout')) {
        showLogin();
        loginError.textContent = 'Вы вышли из системы.';
        loginError.classList.remove('hidden');
    }

    // Клиентская валидация
    loginForm.addEventListener("submit", (e) => {
        loginError.classList.add("hidden");
        const email = loginEmail.value.trim();
        const password = loginPassword.value.trim();

        if (!email || !password) {
            e.preventDefault();
            loginError.textContent = "Пожалуйста, заполните все поля.";
            loginError.classList.remove("hidden");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            e.preventDefault();
            loginError.textContent = "Некорректный формат email.";
            loginError.classList.remove("hidden");
        }
    });

    registerForm.addEventListener("submit", (e) => {
        registerError.classList.add("hidden");
        const name = regName.value.trim();
        const surname = regSurname.value.trim();
        const email = regEmail.value.trim();
        const password = regPassword.value.trim();

        if (!name || !surname || !email || !password) {
            e.preventDefault();
            registerError.textContent = "Пожалуйста, заполните обязательные поля.";
            registerError.classList.remove("hidden");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            e.preventDefault();
            registerError.textContent = "Некорректный формат email.";
            registerError.classList.remove("hidden");
        }
    });
});