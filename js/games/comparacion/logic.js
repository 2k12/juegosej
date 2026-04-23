window.GameRegistry['comparacion'] = class ComparacionGame extends window.GameEngine {
    constructor() {
        super('comparacion', 'Mayor o Menor');
    }

    renderRound() {
        const num1 = this.getRandom(1, 100);
        const num2 = this.getRandom(1, 100);
        
        let correct;
        if (num1 > num2) correct = '>';
        else if (num1 < num2) correct = '<';
        else correct = '=';
        
        const container = document.getElementById('view-container');

        container.innerHTML = `
            <div class="game-container animate-fade-in">
                <div class="round-indicator">Ronda ${this.currentRound} de ${this.maxRounds}</div>
                <div class="question-text">${num1} ? ${num2}</div>
                <div class="options-grid">
                    <button class="option-btn" onclick="window.currentGame.checkAnswer('>', '${correct}', '${num1} > ${num2}')">Mayor (>)</button>
                    <button class="option-btn" onclick="window.currentGame.checkAnswer('<', '${correct}', '${num1} < ${num2}')">Menor (<)</button>
                    <button class="option-btn" onclick="window.currentGame.checkAnswer('=', '${correct}', '${num1} = ${num2}')">Igual (=)</button>
                </div>
            </div>
        `;
    }

    checkAnswer(selected, correct, detail) {
        const isCorrect = selected === correct;
        this.submitAnswer(isCorrect, detail);
    }
}
