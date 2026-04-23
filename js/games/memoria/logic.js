window.GameRegistry['memoria'] = class MemoriaGame extends window.GameEngine {
    constructor() {
        super('memoria', 'Memoria Numérica');
    }

    renderRound() {
        // Generar un número de N dígitos según la ronda
        const digits = 2 + this.currentRound; 
        const min = Math.pow(10, digits - 1);
        const max = Math.pow(10, digits) - 1;
        const numToRemember = this.getRandom(min, max);
        
        const container = document.getElementById('view-container');

        // Fase 1: Mostrar el número
        container.innerHTML = `
            <div class="game-container animate-fade-in">
                <div class="round-indicator">Ronda ${this.currentRound} de ${this.maxRounds}</div>
                <p style="margin-bottom: 2rem;">Memoriza este número:</p>
                <div class="question-text" id="mem-target">${numToRemember}</div>
                <div class="timer-bar" style="height: 4px; background: var(--primary); width: 100%; transition: width 2s linear;"></div>
            </div>
        `;

        setTimeout(() => {
            document.querySelector('.timer-bar').style.width = '0%';
        }, 50);

        // Fase 2: Ocultar y pedir entrada
        setTimeout(() => {
            this.askForInput(numToRemember);
        }, 2000);
    }

    askForInput(correct) {
        const options = this.generateOptions(correct);
        const container = document.getElementById('view-container');

        container.innerHTML = `
            <div class="game-container animate-fade-in">
                <div class="round-indicator">Ronda ${this.currentRound} de ${this.maxRounds}</div>
                <p style="margin-bottom: 2rem;">¿Cuál era el número?</p>
                <div class="options-grid">
                    ${options.map(opt => `
                        <button class="option-btn" onclick="window.currentGame.checkAnswer(${opt}, ${correct})">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    generateOptions(correct) {
        const options = new Set([correct]);
        while (options.size < 4) {
            const wrong = correct + this.getRandom(-10, 10);
            if (wrong > 0 && wrong !== correct) options.add(wrong);
        }
        return Array.from(options).sort(() => Math.random() - 0.5);
    }

    checkAnswer(selected, correct) {
        const isCorrect = selected === correct;
        this.submitAnswer(isCorrect, `Número a recordar: ${correct}`);
    }
}
