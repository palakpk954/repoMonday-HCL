/**
 * Sum Calculator - Addition of Two Numbers (a + b)
 * Features:
 * - Robust number parsing & floating point correction
 * - Interactive history tracking
 * - Proportion bar visualizer
 * - Clipboard copy with toast notification
 * - Micro-actions (steppers, swap, random, clear)
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const numAInput = document.getElementById('numA');
    const numBInput = document.getElementById('numB');
    const btnCalculate = document.getElementById('btnCalculate');
    const btnRandom = document.getElementById('btnRandom');
    const btnClear = document.getElementById('btnClear');
    const btnSwap = document.getElementById('btnSwap');
    const btnCopy = document.getElementById('btnCopy');
    const btnClearHistory = document.getElementById('btnClearHistory');
    
    const resultBox = document.getElementById('resultBox');
    const resultValue = document.getElementById('resultValue');
    const formulaText = document.getElementById('formulaText');
    const formulaBreakdown = document.getElementById('formulaBreakdown');
    
    const visualizer = document.getElementById('visualizer');
    const barA = document.getElementById('barA');
    const barB = document.getElementById('barB');
    const barAText = document.getElementById('barAText');
    const barBText = document.getElementById('barBText');
    
    const historyList = document.getElementById('historyList');
    const toast = document.getElementById('toast');

    let history = [];

    /**
     * Fix floating point precision issues (e.g. 0.1 + 0.2 = 0.3)
     */
    function formatNumber(num) {
        if (!Number.isFinite(num)) return String(num);
        // Round to 10 decimal places to eliminate floating point dust
        const fixed = parseFloat(num.toFixed(10));
        return fixed.toLocaleString('en-US', { maximumFractionDigits: 10 });
    }

    /**
     * Perform the addition operation: a + b
     */
    function calculate() {
        const valA = numAInput.value.trim();
        const valB = numBInput.value.trim();

        // Validate that both inputs have values
        if (valA === '' || valB === '') {
            formulaText.textContent = 'Please enter both values (a and b)';
            formulaBreakdown.classList.remove('highlighted');
            resultBox.classList.remove('has-result');
            resultValue.textContent = '--';
            visualizer.style.display = 'none';

            if (valA === '') numAInput.focus();
            else numBInput.focus();
            return;
        }

        const a = parseFloat(valA);
        const b = parseFloat(valB);

        if (isNaN(a) || isNaN(b)) {
            formulaText.textContent = 'Invalid numbers provided.';
            resultValue.textContent = 'Error';
            return;
        }

        // Calculate Sum: a + b
        const sum = a + b;
        const formattedSum = formatNumber(sum);
        const formattedA = formatNumber(a);
        const formattedB = formatNumber(b);

        // Update UI
        resultValue.textContent = formattedSum;
        resultValue.classList.remove('pulse-animation');
        void resultValue.offsetWidth; // Trigger reflow for CSS animation
        resultValue.classList.add('pulse-animation');

        resultBox.classList.add('has-result');
        formulaText.innerHTML = `<strong>${formattedA}</strong> + <strong>${formattedB}</strong> = <strong>${formattedSum}</strong>`;
        formulaBreakdown.classList.add('highlighted');

        // Update Visualizer bar (when both are positive)
        updateVisualizer(a, b, sum);

        // Add to history
        addToHistory(formattedA, formattedB, formattedSum);
    }

    /**
     * Update proportional bar visualization
     */
    function updateVisualizer(a, b, sum) {
        if (a > 0 && b > 0 && sum > 0) {
            visualizer.style.display = 'block';
            const pctA = Math.max(8, Math.min(92, (a / sum) * 100));
            const pctB = 100 - pctA;

            barA.style.width = `${pctA.toFixed(1)}%`;
            barB.style.width = `${pctB.toFixed(1)}%`;

            barAText.textContent = `${pctA.toFixed(0)}% (a)`;
            barBText.textContent = `${pctB.toFixed(0)}% (b)`;
        } else {
            visualizer.style.display = 'none';
        }
    }

    /**
     * Add entry to history list
     */
    function addToHistory(strA, strB, strSum) {
        // Prevent duplicate consecutive entries
        if (history.length > 0 && history[0].a === strA && history[0].b === strB) {
            return;
        }

        const item = { a: strA, b: strB, sum: strSum, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) };
        history.unshift(item);
        if (history.length > 10) history.pop();

        renderHistory();
    }

    function renderHistory() {
        if (history.length === 0) {
            historyList.innerHTML = '<li class="history-empty">No calculations yet. Enter numbers above!</li>';
            return;
        }

        historyList.innerHTML = history.map((item, index) => `
            <li class="history-item" data-index="${index}" title="Click to load into inputs">
                <span class="history-expr">${item.a} + ${item.b}</span>
                <span class="history-result">= ${item.sum}</span>
            </li>
        `).join('');

        // Add click listener to history items
        historyList.querySelectorAll('.history-item').forEach(el => {
            el.addEventListener('click', () => {
                const idx = el.getAttribute('data-index');
                const selected = history[idx];
                if (selected) {
                    numAInput.value = selected.a.replace(/,/g, '');
                    numBInput.value = selected.b.replace(/,/g, '');
                    calculate();
                }
            });
        });
    }

    /**
     * Swap values of A and B
     */
    btnSwap.addEventListener('click', () => {
        const temp = numAInput.value;
        numAInput.value = numBInput.value;
        numBInput.value = temp;
        
        if (numAInput.value !== '' || numBInput.value !== '') {
            calculate();
        }
    });

    /**
     * Generate random test numbers
     */
    btnRandom.addEventListener('click', () => {
        const randomA = Math.floor(Math.random() * 99) + 1;
        const randomB = Math.floor(Math.random() * 99) + 1;
        numAInput.value = randomA;
        numBInput.value = randomB;
        calculate();
    });

    /**
     * Reset all fields
     */
    btnClear.addEventListener('click', () => {
        numAInput.value = '';
        numBInput.value = '';
        resultValue.textContent = '--';
        resultBox.classList.remove('has-result');
        formulaText.textContent = 'Enter values above and click Calculate';
        formulaBreakdown.classList.remove('highlighted');
        visualizer.style.display = 'none';
        numAInput.focus();
    });

    /**
     * Copy result to clipboard
     */
    btnCopy.addEventListener('click', () => {
        const textToCopy = resultValue.textContent.trim();
        if (textToCopy === '--' || textToCopy === 'Error') {
            showToast('No result to copy yet!');
            return;
        }

        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast('Result copied: ' + textToCopy);
        }).catch(() => {
            showToast('Failed to copy');
        });
    });

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2200);
    }

    /**
     * Clear History
     */
    btnClearHistory.addEventListener('click', () => {
        history = [];
        renderHistory();
        showToast('History cleared');
    });

    // Keyboard support: Enter key triggers calculation
    numAInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') calculate();
    });
    numBInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') calculate();
    });

    btnCalculate.addEventListener('click', calculate);

    // Initial prefill example
    numAInput.value = '15';
    numBInput.value = '25';
    calculate();
});

// Helper for micro-adjust buttons (+1, -1)
window.adjustValue = function(inputId, delta) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const current = parseFloat(input.value) || 0;
    input.value = current + delta;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    document.getElementById('btnCalculate').click();
};

// Helper for single input clear
window.clearSingleInput = function(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.value = '';
    input.focus();
};
