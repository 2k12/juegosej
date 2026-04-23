class GameEngine {
    constructor(gameId, gameName) {
        this.gameId = gameId;
        this.gameName = gameName;
        this.currentRound = 0;
        this.maxRounds = 3;
        this.score = 0;
        this.results = []; // Para el reporte PDF
        this.startTime = null;
    }

    start() {
        this.currentRound = 1;
        this.score = 0;
        this.results = [];
        this.startTime = new Date();
        this.renderQR();
        this.nextRound();
    }

    renderQR() {
        // Eliminar QR previo si existe
        const oldQR = document.querySelector('.qr-container');
        if (oldQR) oldQR.remove();

        const qrContainer = document.createElement('div');
        qrContainer.className = 'qr-container no-print animate-fade-in';
        
        // La URL actual incluye el hash del juego (ej: domain.com/#/sumas)
        const currentURL = window.location.href;
        const qrSize = '100x100';
        const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}&data=${encodeURIComponent(currentURL)}`;

        qrContainer.innerHTML = `
            <span class="qr-label">Acceso Directo</span>
            <img src="${qrURL}" alt="QR Code" class="qr-code">
            <span class="qr-label">${this.gameId}</span>
        `;

        document.body.appendChild(qrContainer);
    }

    nextRound() {
        if (this.currentRound > this.maxRounds) {
            this.endGame();
            return;
        }
        this.renderRound();
    }

    // Método que cada juego debe sobrescribir
    renderRound() {
        console.warn(`El juego ${this.gameName} no ha implementado renderRound()`);
    }

    submitAnswer(isCorrect, detail) {
        if (isCorrect) this.score++;
        
        this.results.push({
            round: this.currentRound,
            isCorrect,
            detail,
            timestamp: new Date().toLocaleTimeString()
        });

        this.currentRound++;
        
        // Animación de feedback antes de la siguiente ronda
        this.showFeedback(isCorrect);
    }

    showFeedback(isCorrect) {
        const container = document.getElementById('view-container');
        const feedback = document.createElement('div');
        feedback.className = `feedback-overlay ${isCorrect ? 'correct' : 'incorrect'} animate-fade-in`;
        feedback.innerHTML = isCorrect ? '✨ ¡Correcto! ✨' : '❌ Sigue intentando ❌';
        
        container.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
            this.nextRound();
        }, 1500);
    }

    endGame() {
        const container = document.getElementById('view-container');
        const endTime = new Date();
        const duration = Math.floor((endTime - this.startTime) / 1000);

        // Preparar el reporte antes de mostrar la pantalla final
        window.PDFManager.preparePrintReport(
            this.gameName, 
            window.app.user.name, 
            this.score, 
            this.results
        );

        container.innerHTML = `
            <div class="end-screen animate-slide-up">
                <h2>¡Juego Terminado!</h2>
                <div class="result-box">
                    <p>Juego: <strong>${this.gameName}</strong></p>
                    <p>Puntaje: <strong>${this.score} / ${this.maxRounds}</strong></p>
                    <p>Tiempo: <strong>${duration} segundos</strong></p>
                </div>
                <div class="action-buttons">
                    <button class="btn-primary" onclick="window.currentGame.start()">Volver a Jugar</button>
                    <button class="btn-primary secondary" onclick="window.app.showDashboard()">Cambiar de Juego</button>
                    <button class="btn-primary accent" onclick="window.app.printResults()">Imprimir Resultados</button>
                </div>
            </div>
        `;
    }

    // Helper para generar números aleatorios no repetitivos si es necesario
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

window.GameEngine = GameEngine;
