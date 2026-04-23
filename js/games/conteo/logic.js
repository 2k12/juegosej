window.GameRegistry['conteo'] = class ConteoGame extends window.GameEngine {
    constructor() {
        super('conteo', 'Conteo Visual');
        this.emojis = ['⭐', '🍎', '🐱', '⚽', '🚀', '🌈'];
    }

    renderRound() {
        const count = this.getRandom(5, 15);
        const emoji = this.emojis[this.getRandom(0, this.emojis.length - 1)];
        
        const options = this.generateOptions(count);
        const container = document.getElementById('view-container');

        container.innerHTML = `
            <div class="game-container animate-fade-in">
                <div class="round-indicator">Ronda ${this.currentRound} de ${this.maxRounds}</div>
                <p style="margin-bottom: 1rem;">¿Cuántos hay?</p>
                <div class="emoji-display" style="font-size: 2.5rem; letter-spacing: 10px; margin-bottom: 2rem; background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 1rem;">
                    ${Array(count).fill(emoji).join(' ')}
                </div>
                <div class="options-grid">
                    ${options.map(opt => `
                        <button class="option-btn" onclick="window.currentGame.checkAnswer(${opt}, ${count})">${opt}</button>
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

    checkAnswer(selected, correct) {
        const isCorrect = selected === correct;
        this.submitAnswer(isCorrect, `Había ${correct} elementos.`);
    }
}
