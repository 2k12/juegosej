window.GameRegistry['redondeo'] = class RedondeoGame extends window.GameEngine {
    constructor() {
        super('redondeo', 'Redondeo');
    }

    renderRound() {
        const num = this.getRandom(11, 99);
        const correct = Math.round(num / 10) * 10;
        
        const options = this.generateOptions(correct);
        const container = document.getElementById('view-container');

        container.innerHTML = `
            <div class="game-container animate-fade-in">
                <div class="round-indicator">Ronda ${this.currentRound} de ${this.maxRounds}</div>
                <p style="margin-bottom: 2rem;">Redondea a la decena más cercana:</p>
                <div class="question-text">${num}</div>
                <div class="options-grid">
                    ${options.map(opt => `
                        <button class="option-btn" onclick="window.currentGame.checkAnswer(${opt}, ${correct}, ${num})">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    generateOptions(correct) {
        // En redondeo a decena, las opciones suelen ser decenas
        const options = new Set([correct]);
        const base = Math.floor(correct / 10) * 10;
        options.add(base - 10);
        options.add(base + 10);
        options.add(base + 20);
        
        return Array.from(options).filter(o => o >= 0).sort(() => Math.random() - 0.5).slice(0, 4);
    }

    checkAnswer(selected, correct, original) {
        const isCorrect = selected === correct;
        this.submitAnswer(isCorrect, `${original} redondeado es ${correct}`);
    }
}
