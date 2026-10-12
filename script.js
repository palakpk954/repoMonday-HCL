/**
 * Dynamic Sum Calculator (A + B)
 * - Multi-Theme Switching with LocalStorage persistence
 * - Floating Math Symbol Canvas Particle Engine
 * - Smooth Number Count-Up Animation
 * - Sparkle Confetti Blast on Calculation
 * - Interactive Visualizer & History Tracking
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
    const operatorBtn = document.getElementById('operatorBtn');
    
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
    const themeButtons = document.querySelectorAll('.theme-btn');

    let history = [];
    let currentAnimFrame = null;

    // ==========================================================================
    // 1. Theme Switcher System
    // ==========================================================================
    const savedTheme = localStorage.getItem('sumCalcTheme') || 'aurora';
    applyTheme(savedTheme);

    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-set-theme');
            applyTheme(theme);
            localStorage.setItem('sumCalcTheme', theme);
        });
    });

    function applyTheme(themeName) {
        document.documentElement.setAttribute('data-theme', themeName);
        themeButtons.forEach(btn => {
            if (btn.getAttribute('data-set-theme') === themeName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // ==========================================================================
    // 2. Interactive Background Canvas Particle Engine
    // ==========================================================================
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const symbols = ['+', '=', '•', '✦', '▲', '●'];
        const particles = [];
        const count = Math.min(35, Math.floor(window.innerWidth / 35));

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.45,
                vy: (Math.random() - 0.5) * 0.45,
                size: Math.random() * 14 + 10,
                symbol: symbols[Math.floor(Math.random() * symbols.length)],
                opacity: Math.random() * 0.35 + 0.1,
                rot: Math.random() * Math.PI * 2,
                vrot: (Math.random() - 0.5) * 0.02
            });
        }

        function drawParticles() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.rot += p.vrot;

                if (p.x < -20) p.x = width + 20;
                if (p.x > width + 20) p.x = -20;
                if (p.y < -20) p.y = height + 20;
                if (p.y > height + 20) p.y = -20;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot);
                ctx.font = `${p.size}px 'JetBrains Mono', monospace`;
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(p.symbol, 0, 0);
                ctx.restore();
            });

            requestAnimationFrame(drawParticles);
        }

        drawParticles();
    }

    // ==========================================================================
    // 3. Sparkle / Confetti Burst on Result
    // ==========================================================================
    function createSparkleBurst(originEl) {
        const rect = originEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const colors = ['#f43f5e', '#a855f7', '#06b6d4', '#10b981', '#f59e0b', '#38bdf8'];

        for (let i = 0; i < 24; i++) {
            const sparkle = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.floor(Math.random() * 8 + 6);
            
            sparkle.style.position = 'fixed';
            sparkle.style.left = `${centerX}px`;
            sparkle.style.top = `${centerY}px`;
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;
            sparkle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            sparkle.style.backgroundColor = color;
            sparkle.style.boxShadow = `0 0 10px ${color}`;
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '9999';
            sparkle.style.transition = 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
            document.body.appendChild(sparkle);

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 110 + 40;
            const destX = Math.cos(angle) * distance;
            const destY = Math.sin(angle) * distance;

            requestAnimationFrame(() => {
                sparkle.style.transform = `translate(${destX}px, ${destY}px) scale(0)`;
                sparkle.style.opacity = '0';
            });

            setTimeout(() => {
                sparkle.remove();
            }, 700);
        }
    }

    // ==========================================================================
    // 4. Smooth Number Count-Up Animation
    // ==========================================================================
    function animateNumber(targetNumber) {
        if (currentAnimFrame) cancelAnimationFrame(currentAnimFrame);

        if (!Number.isFinite(targetNumber) || Math.abs(targetNumber) > 100000000) {
            resultValue.textContent = formatNumber(targetNumber);
            return;
        }

        const duration = 400; // ms
        const startTime = performance.now();
        const startVal = 0;

        function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = startVal + (targetNumber - startVal) * easeProgress;

            resultValue.textContent = formatNumber(currentVal);

            if (progress < 1) {
                currentAnimFrame = requestAnimationFrame(updateCount);
            } else {
                resultValue.textContent = formatNumber(targetNumber);
            }
        }

        currentAnimFrame = requestAnimationFrame(updateCount);
    }

    function formatNumber(num) {
        if (!Number.isFinite(num)) return String(num);
        const fixed = parseFloat(num.toFixed(8));
        return fixed.toLocaleString('en-US', { maximumFractionDigits: 8 });
    }

    // ==========================================================================
    // 5. Addition Calculation Logic (a + b)
    // ==========================================================================
    function calculate() {
        const valA = numAInput.value.trim();
        const valB = numBInput.value.trim();

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
            formulaText.textContent = 'Invalid numbers entered.';
            resultValue.textContent = 'Error';
            return;
        }

        const sum = a + b;
        const formattedA = formatNumber(a);
        const formattedB = formatNumber(b);
        const formattedSum = formatNumber(sum);

        // Animate result roll-up and blast
        animateNumber(sum);
        resultValue.classList.remove('pulse-animation');
        void resultValue.offsetWidth;
        resultValue.classList.add('pulse-animation');

        resultBox.classList.add('has-result');
        formulaText.innerHTML = `<strong>${formattedA}</strong> + <strong>${formattedB}</strong> = <strong>${formattedSum}</strong>`;
        formulaBreakdown.classList.add('highlighted');

        // Trigger confetti burst
        createSparkleBurst(resultValue);

        // Update proportion bar
        updateVisualizer(a, b, sum);

        // Save to History
        addToHistory(formattedA, formattedB, formattedSum);
    }

    function updateVisualizer(a, b, sum) {
        if (a > 0 && b > 0 && sum > 0) {
            visualizer.style.display = 'block';
            const pctA = Math.max(10, Math.min(90, (a / sum) * 100));
            const pctB = 100 - pctA;

            barA.style.width = `${pctA.toFixed(1)}%`;
            barB.style.width = `${pctB.toFixed(1)}%`;

            barAText.textContent = `${pctA.toFixed(0)}% (a)`;
            barBText.textContent = `${pctB.toFixed(0)}% (b)`;
        } else {
            visualizer.style.display = 'none';
        }
    }

    // ==========================================================================
    // 6. History Management
    // ==========================================================================
    function addToHistory(strA, strB, strSum) {
        if (history.length > 0 && history[0].a === strA && history[0].b === strB) {
            return;
        }

        const item = {
            a: strA,
            b: strB,
            sum: strSum,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
        history.unshift(item);
        if (history.length > 8) history.pop();

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

    // ==========================================================================
    // 7. Interactive Controls & Actions
    // ==========================================================================
    btnSwap.addEventListener('click', () => {
        btnSwap.style.transform = 'rotate(180deg) scale(1.1)';
        setTimeout(() => { btnSwap.style.transform = ''; }, 300);

        const temp = numAInput.value;
        numAInput.value = numBInput.value;
        numBInput.value = temp;
        
        if (numAInput.value !== '' || numBInput.value !== '') {
            calculate();
        }
    });

    if (operatorBtn) {
        operatorBtn.addEventListener('click', () => {
            operatorBtn.classList.remove('pulse-animation');
            void operatorBtn.offsetWidth;
            operatorBtn.classList.add('pulse-animation');
            if (numAInput.value !== '' && numBInput.value !== '') {
                calculate();
            }
        });
    }

    btnRandom.addEventListener('click', () => {
        const randomA = Math.floor(Math.random() * 99) + 1;
        const randomB = Math.floor(Math.random() * 99) + 1;
        numAInput.value = randomA;
        numBInput.value = randomB;
        calculate();
    });

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

    btnClearHistory.addEventListener('click', () => {
        history = [];
        renderHistory();
        showToast('History cleared');
    });

    // Keyboard support: Enter key
    numAInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') calculate();
    });
    numBInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') calculate();
    });

    btnCalculate.addEventListener('click', calculate);

    // Initial prefill
    numAInput.value = '18';
    numBInput.value = '24';
    calculate();
});

// Stepper helpers
window.adjustValue = function(inputId, delta) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const current = parseFloat(input.value) || 0;
    input.value = current + delta;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    document.getElementById('btnCalculate').click();
};

window.clearSingleInput = function(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.value = '';
    input.focus();
};
