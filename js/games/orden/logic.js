window.GameRegistry['orden'] = class OrdenGame extends window.GameEngine {
    constructor() {
        super('orden', 'Orden Numérico');
    }

    renderRound() {
        const nums = [];
        while (nums.length < 3) {
            const n = this.getRandom(1, 100);
            if (!nums.includes(n)) nums.push(n);
        }
        
        const correct = [...nums].sort((a, b) => a - b).join(' < ');
        const options = this.generateOptions(nums);
        
        const container = document.getElementById('view-container');

        container.innerHTML = `
            <div class="game-container animate-fade-in">
                <div class="round-indicator">Ronda ${this.currentRound} de ${this.maxRounds}</div>
                <p style="margin-bottom: 2rem;">¿Cuál es el orden correcto de menor a mayor?</p>
                <div class="question-text">${nums.join(', ')}</div>
                
                <div class="options-grid" style="grid-template-columns: 1fr;">
                    ${options.map(opt => `
                        <button class="option-btn" onclick="window.currentGame.checkAnswer('${opt}', '${correct}')">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    generateOptions(nums) {
        const correct = [...nums].sort((a, b) => a - b).join(' < ');
        const options = new Set([correct]);
        
        while (options.size < 3) {
            const shuffled = [...nums].sort(() => Math.random() - 0.5).join(' < ');
            options.add(shuffled);
        }
        
        return Array.from(options).sort(() => Math.random() - 0.5);
    }

    checkAnswer(selected, correct) {
        const isCorrect = selected === correct;
        this.submitAnswer(isCorrect, `El orden era: ${correct}`);
    }
}
