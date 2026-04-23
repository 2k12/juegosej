window.GameRegistry['secuencias'] = class SecuenciasGame extends window.GameEngine {
    constructor() {
        super('secuencias', 'Secuencias Lógicas');
    }

    renderRound() {
        const start = this.getRandom(1, 10);
        const step = this.getRandom(2, 5);
        const sequence = [start, start + step, start + step * 2, start + step * 3];
        const missingIndex = this.getRandom(0, 3);
        const correct = sequence[missingIndex];
        
        const displaySequence = [...sequence];
        displaySequence[missingIndex] = '?';
        
        const options = this.generateOptions(correct);
        const container = document.getElementById('view-container');

        container.innerHTML = `
            <div class="game-container animate-fade-in">
                <div class="round-indicator">Ronda ${this.currentRound} de ${this.maxRounds}</div>
                <div class="question-text">${displaySequence.join(', ')}</div>
                <p style="margin-bottom: 2rem; color: var(--text-secondary);">¿Qué número falta en la serie?</p>
                <div class="options-grid">
                    ${options.map(opt => `
                        <button class="option-btn" onclick="window.currentGame.checkAnswer(${opt}, ${correct}, '${sequence.join(', ')}')">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    generateOptions(correct) {
        const options = new Set([correct]);
        while (options.size < 4) {
            const wrong = correct + this.getRandom(-5, 5);
            if (wrong > 0 && wrong !== correct) options.add(wrong);
        }
        return Array.from(options).sort(() => Math.random() - 0.5);
    }

    checkAnswer(selected, correct, detail) {
        const isCorrect = selected === correct;
        this.submitAnswer(isCorrect, `Secuencia: ${detail}`);
    }
}
