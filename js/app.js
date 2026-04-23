class App {
    constructor() {
        this.user = { name: null };
        this.games = [
            { id: 'sumas', name: 'Sumas Rápidas', folder: 'sumas' },
            { id: 'restas', name: 'Restas Desafiantes', folder: 'restas' },
            { id: 'multi', name: 'Multiplicaciones Flash', folder: 'multi' },
            { id: 'div', name: 'Divisiones Mentales', folder: 'div' },
            { id: 'comparacion', name: 'Mayor o Menor', folder: 'comparacion' },
            { id: 'secuencias', name: 'Secuencias', folder: 'secuencias' },
            { id: 'pares', name: 'Pares o Impares', folder: 'pares' },
            { id: 'memoria', name: 'Memoria Numérica', folder: 'memoria' },
            { id: 'conteo', name: 'Conteo Visual', folder: 'conteo' },
            { id: 'redondeo', name: 'Redondeo', folder: 'redondeo' },
            { id: 'fracciones', name: 'Fracciones', folder: 'fracciones' },
            { id: 'orden', name: 'Orden Numérico', folder: 'orden' }
        ];
        this.init();
    }

    init() {
        this.setupEventListeners();
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
    }

    handleRoute() {
        const hash = window.location.hash || '#/';
        const path = hash.substring(1); // Eliminar el '#'

        if (!this.user.name && localStorage.getItem('mg_user_name')) {
            this.user.name = localStorage.getItem('mg_user_name');
        }

        if (!this.user.name) {
            this.pendingRoute = path;
            this.showLogin();
            return;
        }

        if (path === '/' || path === '') {
            this.showDashboard();
        } else {
            const gameId = path.replace('/', '');
            this.loadGame(gameId);
        }
    }

    navigateTo(path) {
        window.location.hash = path;
    }

    setupEventListeners() {
        document.getElementById('logout-btn').addEventListener('click', () => this.logout());
    }

    showLogin() {
        const container = document.getElementById('view-container');
        document.getElementById('main-nav').classList.add('hidden');
        
        container.innerHTML = `
            <div class="auth-card">
                <h1>MultiGames</h1>
                <p>Ingresa tu nombre para comenzar la aventura</p>
                <div class="input-group">
                    <input type="text" id="username-input" placeholder="Tu nombre artístico..." autocomplete="off">
                </div>
                <button id="login-btn" class="btn-primary">¡Comenzar!</button>
            </div>
        `;

        document.getElementById('login-btn').addEventListener('click', () => {
            const name = document.getElementById('username-input').value.trim();
            if (name) {
                this.login(name);
            } else {
                alert('Por favor, ingresa tu nombre.');
            }
        });
    }

    login(name) {
        this.user.name = name;
        localStorage.setItem('mg_user_name', name);
        
        if (this.pendingRoute && this.pendingRoute !== '/') {
            const target = this.pendingRoute;
            this.pendingRoute = null;
            this.navigateTo(target);
        } else {
            this.showDashboard();
        }
    }

    logout() {
        localStorage.removeItem('mg_user_name');
        this.user.name = null;
        this.navigateTo('/');
        location.reload();
    }

    showDashboard() {
        // Limpiar QR si existe
        const oldQR = document.querySelector('.qr-container');
        if (oldQR) oldQR.remove();

        const container = document.getElementById('view-container');
        document.getElementById('main-nav').classList.remove('hidden');
        document.getElementById('display-name').textContent = `¡Hola, ${this.user.name}!`;
        
        this.renderNavbar();

        container.innerHTML = `
            <div class="dashboard animate-fade-in">
                <h2 class="section-title">Elige tu próximo desafío</h2>
                <div class="game-grid">
                    ${this.games.map(game => `
                        <div class="game-card animate-slide-up" onclick="window.app.navigateTo('/${game.id}')">
                            <div class="game-icon">${game.name.charAt(0)}</div>
                            <h3>${game.name}</h3>
                            <button class="btn-play">Jugar ahora</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderNavbar() {
        const navLinks = document.getElementById('nav-links');
        navLinks.innerHTML = this.games.map(game => `
            <a href="#/${game.id}" class="nav-item ${window.location.hash === '#/'+game.id ? 'active' : ''}">${game.name}</a>
        `).join('');
    }

    async loadGame(gameId) {
        const game = this.games.find(g => g.id === gameId);
        if (!game) {
            this.navigateTo('/');
            return;
        }

        // Inicializar registro si no existe
        if (!window.GameRegistry) window.GameRegistry = {};

        // Actualizar UI del Navbar
        this.renderNavbar();

        const container = document.getElementById('view-container');
        container.innerHTML = `<div class="loader">Cargando ${game.name}...</div>`;

        try {
            // Si el juego ya fue cargado previamente, lo usamos directamente
            if (!window.GameRegistry[gameId]) {
                await this.loadScript(`js/games/${game.folder}/logic.js`);
            }
            
            const GameClass = window.GameRegistry[gameId];
            if (!GameClass) throw new Error(`Clase no encontrada para ${gameId}`);
            
            window.currentGame = new GameClass();
            window.currentGame.start();
        } catch (error) {
            console.error('Error al cargar el juego:', error);
            container.innerHTML = `<div>Error al cargar el juego. Asegúrate de que los archivos existan.</div>`;
        }
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    printResults() {
        if (window.currentGame) {
            window.print();
        }
    }
}

window.app = new App();
