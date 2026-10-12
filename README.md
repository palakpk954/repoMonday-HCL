# repoMonday-HCL 🧮

A modern, responsive web application to calculate the addition of two numbers (**a + b**) with dynamic user inputs, real-time feedback, and interactive calculation features.

**Author:** Palak

---

## 🚀 Features

- **Dynamic Inputs ($a + b$):** Easily input any numbers (integers, decimals, and negative numbers).
- **Interactive Controls:**
  - ➕ **Calculate Sum:** Computes $a + b$ with floating-point precision correction.
  - 🔄 **Swap ($a \leftrightarrow b$):** Instantly swap values between $a$ and $b$.
  - 🎲 **Random Generator:** Quick-fill random numbers to test additions.
  - ↺ **Clear:** Reset inputs and results with one click.
  - 🔢 **Micro Adjustments:** Quick `+1` and `-1` steppers for each variable.
- **Visual Presentation:**
  - Formula breakdown display: e.g., `15 + 25 = 40`.
  - Proportional contribution bar showing the relative weight of each number.
  - Copy result to clipboard with instant toast confirmation.
- **Calculation History:** Keeps a log of recent additions with click-to-reload capability.
- **Keyboard Friendly:** Press <kbd>Enter</kbd> from either input field to calculate immediately.
- **Glassmorphic UI:** Sleek dark-mode aesthetic with ambient glowing gradients and smooth micro-animations.

---

## 🛠️ Built With

- **HTML5:** Semantic structure, accessible forms, and input validation.
- **CSS3:** Custom properties (CSS variables), glassmorphism (`backdrop-filter`), flexbox/grid layout, and keyframe animations.
- **Vanilla JavaScript (ES6+):** Pure DOM manipulation, event listeners, and math computations.

---

## 📂 Project Structure

```text
repoMonday-HCL/
├── index.html            # Main HTML entry point
├── style.css             # Glassmorphic dark styling
├── script.js             # Calculator logic and event handlers
├── README.md             # Project documentation
└── copyofMonday/         # Component package folder
    ├── index.html
    ├── style.css
    └── script.js
```

---

## 💻 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/palakpk954/repoMonday-HCL.git
   cd repoMonday-HCL
   ```

2. **Open in Browser:**
   - Double-click `index.html` to open it in your browser of choice (Chrome, Edge, Firefox, Safari).
   - Or run with VS Code **Live Server** extension.
