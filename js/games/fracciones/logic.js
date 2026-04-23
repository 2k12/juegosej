window.GameRegistry['fracciones'] = class FraccionesGame extends window.GameEngine {
    constructor() {
        super('fracciones', 'Fracciones Básicas');
    }

    renderRound() {
        const denominator = this.getRandom(2, 6);
        const numerator = this.getRandom(1, denominator - 1);
        const correct = `${numerator}/${denominator}`;
        
        const options = this.generateOptions(correct, numerator, denominator);
        const container = document.getElementById('view-container');

        container.innerHTML = `
            <div class="game-container animate-fade-in">
                <div class="round-indicator">Ronda ${this.currentRound} de ${this.maxRounds}</div>
                <p style="margin-bottom: 2rem;">¿Qué fracción representa esta figura?</p>
                
                <div class="fraction-visual" style="display: flex; justify-content: center; margin-bottom: 3rem;">
                    ${this.createVisual(numerator, denominator)}
                </div>

                <div class="options-grid">
                    ${options.map(opt => `
                        <button class="option-btn" onclick="window.currentGame.checkAnswer('${opt}', '${correct}')">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    createVisual(num, den) {
        let html = '<div style="display: flex; gap: 5px;">';
        for (let i = 0; i < den; i++) {
            const color = i < num ? 'var(--primary)' : 'rgba(255,255,255,0.1)';
            html += `<div style="width: 50px; height: 50px; background: ${color}; border: 2px solid white; border-radius: 5px;"></div>`;
        }
        html += '</div>';
        return html;
    }

    generateOptions(correct, n, d) {
        const options = new Set([correct]);
        while (options.size < 4) {
            const randN = this.getRandom(1, 5);
            const randD = this.getRandom(randN + 1, 6);
            options.add(`${randN}/${randD}`);
        }
        return Array.from(options).sort(() => Math.random() - 0.5);
    }

    checkAnswer(selected, correct) {
        const isCorrect = selected === correct;
        this.submitAnswer(isCorrect, `Fracción correcta: ${correct}`);
    }
}
