document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const signupEmail = document.getElementById('signupEmail');
    const signupPassword = document.getElementById('signupPassword');
    const signupName = document.getElementById('signupName');
    const signupError = document.getElementById('signupError');
    const loginError = document.getElementById('loginError');
    const welcomeMsg = document.getElementById('welcomeMsg');
    const logoutBtn = document.getElementById('logoutBtn');

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser && window.location.pathname.includes('home.html')) {
        welcomeMsg.textContent = `Welcome, ${loggedInUser.name}!`;
    } else if (window.location.pathname === '/home.html') {
        window.location.href = 'login.html';
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = signupName.value.trim();
            const email = signupEmail.value.trim();
            const password = signupPassword.value.trim();

            const userExists = users.some(user => user.email === email);
            if (userExists) {
                signupError.textContent = 'This email is already registered.';
            } else {
                const newUser = { name, email, password };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                window.location.href = 'index.html';
            }
        });
    }


    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginEmail.value.trim();
            const password = loginPassword.value.trim();


            const user = users.find(user => user.email === email && user.password === password);
            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = 'home.html';
            } else {
                loginError.textContent = 'Invalid email or password.';
            }
        });
    }


    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'index.html';
        });
    }
});
