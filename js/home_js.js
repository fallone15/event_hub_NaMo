const API_URL = 'http://localhost:5000';

function setupLoginForm(form) {
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email && password) {
            try {
                const response = await fetch(`${API_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                    credentials: 'include'
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Login successful!');
                    window.location.href = "/html/events.html";
                } else {
                    alert(data.error || 'Login failed');
                }
            } catch (error) {
    console.error('Erreur login :', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
        alert('Impossible de contacter le serveur. Vérifiez que le backend est bien démarré.');
    } else {
        alert('Erreur de connexion au serveur.');
    }
}

        } else {
            alert('Please fill all fields');
        }
    });
}

function setupRegisterForm(form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const confirm = document.getElementById('reg-confirm').value;

        if (password !== confirm) {
            alert("Passwords don't match!");
            return;
        }

        if (name && email && password) {
            try {
                const response = await fetch(`${API_URL}/api/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });

                const data = await response.json();
                if (response.ok) {
                    alert('Registration successful!');
                    window.location.href = '/html/login.html';
                } else {
                    alert(data.error || 'Registration failed');
                }
            } catch (err) {
                console.error(err);
                alert('Erreur de connexion au serveur.');
            }
        } else {
            alert('Please fill all fields');
        }
    });
}

function setupTogglePassword() {
    document.querySelectorAll('.toggle-password').forEach(eye => {
        eye.addEventListener('click', function () {
            const input = this.previousElementSibling;
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            this.textContent = isPassword ? '🙈' : '👁';
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

async function checkAuthStatus() {
    try {
        const response = await fetch(`${API_URL}/api/auth/status`, {
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            updateUIForLoggedInUser(data.user);
        } else {
            updateUIForLoggedOutUser();
        }
    } catch (error) {
        console.error('Error checking auth status:', error);
        updateUIForLoggedOutUser();
    }
}

function updateUIForLoggedInUser(user) {
    const authLinks = document.getElementById('auth-links');
    const userMenu = document.getElementById('user-menu');
    const usernameDisplay = document.getElementById('username-display');

    if (authLinks && userMenu && usernameDisplay) {
        authLinks.style.display = 'none';
        userMenu.style.display = 'block';
        usernameDisplay.textContent = user.username;
    }

    const createEventBtn = document.getElementById('create-event-btn');
    if (createEventBtn) {
        createEventBtn.style.display = 'block';
    }
}

function updateUIForLoggedOutUser() {
    const authLinks = document.getElementById('auth-links');
    const userMenu = document.getElementById('user-menu');

    if (authLinks && userMenu) {
        authLinks.style.display = 'block';
        userMenu.style.display = 'none';
    }

    const createEventBtn = document.getElementById('create-event-btn');
    if (createEventBtn) {
        createEventBtn.style.display = 'none';
    }
}

async function logout() {
    try {
        const response = await fetch(`${API_URL}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });

        if (response.ok) {
            window.location.href = '/html/home.html';
        } else {
            const data = await response.json();
            alert(data.error || 'Logout failed');
        }
    } catch (error) {
        console.error('Error logging out:', error);
        alert('Erreur de déconnexion.');
    }
}

function adjustImageFocus() {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.objectPosition = '50% 80%';
    }
}

function loadEvents() {
    fetch(`${API_URL}/api/events`)
        .then(res => res.json())
        .then(events => {
            afficherEvenements(events);
        })
        .catch(err => console.error('Erreur chargement événements :', err));
}

function afficherEvenements(events) {
    const container = document.getElementById('events-container');
    if (!container) return;

    container.innerHTML = '';

    if (events.length === 0) {
        container.innerHTML = '<p>Aucun événement à afficher pour le moment.</p>';
        return;
    }

    events.forEach(event => {
        const div = document.createElement('div');
        div.classList.add('event-card');
        div.innerHTML = `
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <p><strong>Date:</strong> ${new Date(event.date_time).toLocaleDateString()} ${new Date(event.date_time).toLocaleTimeString()}</p>
        `;
        container.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    adjustImageFocus();

    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) logoutLink.addEventListener('click', logout);

    const loginForm = document.getElementById('login-form');
    if (loginForm) setupLoginForm(loginForm);

    const registerForm = document.getElementById('register-form');
    if (registerForm) setupRegisterForm(registerForm);

    setupTogglePassword();

    if (window.location.pathname.includes('/html/events.html')) {
        loadEvents();
    }
});
