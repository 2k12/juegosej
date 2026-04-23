window.GameRegistry['pares'] = class ParesGame extends window.GameEngine {
    constructor() {
        super('pares', 'Pares o Impares');
    }

    renderRound() {
        const num = this.getRandom(1, 100);
        const isPair = num % 2 === 0;
        const correct = isPair ? 'Par' : 'Impar';
        
        const container = document.getElementById('view-container');

        container.innerHTML = `
            <div class="game-container animate-fade-in">
                <div class="round-indicator">Ronda ${this.currentRound} de ${this.maxRounds}</div>
                <div class="question-text">¿El número ${num} es Par o Impar?</div>
                <div class="options-grid">
                    <button class="option-btn" onclick="window.currentGame.checkAnswer('Par', '${correct}', '${num} es ${correct}')">Es Par</button>
                    <button class="option-btn" onclick="window.currentGame.checkAnswer('Impar', '${correct}', '${num} es ${correct}')">Es Impar</button>
                </div>
            </div>
        `;
    }

    checkAnswer(selected, correct, detail) {
        const isCorrect = selected === correct;
        this.submitAnswer(isCorrect, detail);
    }
}
