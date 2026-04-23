class PDFManager {
    static preparePrintReport(gameName, userName, score, results) {
        // Eliminar reportes previos si existen
        const oldReport = document.querySelector('.print-report');
        if (oldReport) oldReport.remove();

        const report = document.createElement('div');
        report.className = 'print-report hidden';
        
        const date = new Date().toLocaleDateString();
        
        report.innerHTML = `
            <div style="padding: 40px; font-family: sans-serif;">
                <h1 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">Reporte de Resultados - MultiGames</h1>
                <div style="margin: 20px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <p><strong>Estudiante:</strong> ${userName}</p>
                    <p><strong>Fecha:</strong> ${date}</p>
                    <p><strong>Juego:</strong> ${gameName}</p>
                    <p><strong>Puntaje Final:</strong> ${score} / 3</p>
                </div>
                
                <h3 style="margin-top: 30px;">Detalle de las Rondas:</h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                        <tr style="background: #f1f5f9;">
                            <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Ronda</th>
                            <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Desafío</th>
                            <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Resultado</th>
                            <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${results.map(res => `
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 12px;">${res.round}</td>
                                <td style="border: 1px solid #ddd; padding: 12px;">${res.detail}</td>
                                <td style="border: 1px solid #ddd; padding: 12px; color: ${res.isCorrect ? '#10b981' : '#ef4444'}; font-weight: bold;">
                                    ${res.isCorrect ? 'Correcto' : 'Incorrecto'}
                                </td>
                                <td style="border: 1px solid #ddd; padding: 12px;">${res.timestamp}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div style="margin-top: 50px; text-align: center; color: #64748b; font-style: italic;">
                    "La educación es el arma más poderosa para cambiar el mundo."
                </div>
            </div>
        `;

        document.body.appendChild(report);
    }
}

window.PDFManager = PDFManager;
