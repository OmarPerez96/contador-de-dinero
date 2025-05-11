
Built by https://www.blackbox.ai

---

# Contador de Dinero

## Project Overview

Contador de Dinero is a web application that allows users to input different denominations of money, calculate the total value, and view the results both numerically and in words (in Spanish). The application provides a simple and intuitive interface, leveraging Tailwind CSS for design and a vanilla JavaScript backend for functionality. Users can save their counting history, providing a handy tool for personal finance management.

## Installation

To run the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd contador-de-dinero
   ```

2. **Open the `index.html` file** in your web browser:
   Simply double-click on the `index.html` file or open it in your preferred browser.

> **Note**: There are no additional dependencies or installation steps required as the project uses CDN links for CSS.

## Usage

1. Input the number of coins/bills for each denomination into the provided fields.
2. The total amount will automatically update and be displayed numerically and in words (in Spanish).
3. Click on the "Guardar Conteo" button to save the current total in the history.
4. Use the "Limpiar Todo" button to reset all input fields.

## Features

- Input fields for various denominations of money ($0.50, $1, $2, $5, $10, $20, $50, $100, $200, $500, and $1000 pesos).
- Auto-calculation of the total amount as inputs change.
- Display of the total amount in both numerical format and Spanish words.
- Historical record of past counts, stored in the browser using Local Storage.
- Option to clear all input fields and reset the display.

## Dependencies

This project uses the following dependencies:

- Tailwind CSS (via CDN): For styling the application.
- Vanilla JavaScript: For all functionalities including calculations and interactive features.

## Project Structure

Here’s a brief overview of the project structure:

```
contador-de-dinero/
│
├── index.html     # Main HTML file containing the structure of the application
├── app.js         # JavaScript file containing all logic and functions for the application
└── styles.css     # Inline styles using Tailwind CSS embedded in the HTML
```

Each file plays a vital role in setting up the full experience of the web application, from user interaction to data processing and displaying results.

---

Feel free to customize the application to enhance its functionality or design as per your needs!