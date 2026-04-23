window.GameRegistry['div'] = class DivGame extends window.GameEngine {
    constructor() {
        super('div', 'Divisiones Mentales');
    }

    renderRound() {
        const divisor = this.getRandom(2, 10);
        const quotient = this.getRandom(1, 10);
        const dividend = divisor * quotient;
        
        const options = this.generateOptions(quotient);
        const container = document.getElementById('view-container');

        container.innerHTML = `
            <div class="game-container animate-fade-in">
                <div class="round-indicator">Ronda ${this.currentRound} de ${this.maxRounds}</div>
                <div class="question-text">${dividend} ÷ ${divisor} = ?</div>
                <div class="options-grid">
                    ${options.map(opt => `
                        <button class="option-btn" onclick="window.currentGame.checkAnswer(${opt}, ${quotient}, '${dividend} ÷ ${divisor}')">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    generateOptions(correct) {
        const options = new Set([correct]);
        while (options.size < 4) {
            const wrong = correct + this.getRandom(-3, 3);
            if (wrong > 0 && wrong !== correct) options.add(wrong);
        }
        return Array.from(options).sort(() => Math.random() - 0.5);
    }

    checkAnswer(selected, correct, detail) {
        const isCorrect = selected === correct;
        this.submitAnswer(isCorrect, `${detail} = ${correct}`);
    }
}
