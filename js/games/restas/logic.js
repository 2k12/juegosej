window.GameRegistry['restas'] = class RestasGame extends window.GameEngine {
    constructor() {
        super('restas', 'Restas Desafiantes');
    }

    renderRound() {
        let num1 = this.getRandom(10, 30);
        let num2 = this.getRandom(1, num1); // Asegurar resultado positivo
        const result = num1 - num2;
        
        const options = this.generateOptions(result);
        const container = document.getElementById('view-container');

        container.innerHTML = `
            <div class="game-container animate-fade-in">
                <div class="round-indicator">Ronda ${this.currentRound} de ${this.maxRounds}</div>
                <div class="question-text">${num1} - ${num2} = ?</div>
                <div class="options-grid">
                    ${options.map(opt => `
                        <button class="option-btn" onclick="window.currentGame.checkAnswer(${opt}, '${num1} - ${num2}')">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    generateOptions(correct) {
        const options = new Set([correct]);
        while (options.size < 4) {
            const wrong = correct + this.getRandom(-5, 5);
            if (wrong >= 0 && wrong !== correct) options.add(wrong);
        }
        return Array.from(options).sort(() => Math.random() - 0.5);
    }

    checkAnswer(selected, detail) {
        const correct = eval(detail);
        const isCorrect = selected === correct;
        this.submitAnswer(isCorrect, `${detail} = ${correct}`);
    }
}
