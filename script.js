let currentInput = '';
let operation = '';
let firstOperand = '';

function appendNumber(number) {
    currentInput += number.toString();
    updateDisplay();
}

function appendComma() {
    if (!currentInput.includes(',')) {
        currentInput += ',';
        updateDisplay();
    }
}

function setOperation(op) {
    if (currentInput === '') return;
    if (firstOperand !== '') {
        calculateResult();
    }
    operation = op;
    firstOperand = currentInput;
    currentInput = '';
}

function calculateResult() {
    let result;
    const secondOperand = currentInput;
    if (firstOperand === '' || secondOperand === '') return;

    switch (operation) {
        case '+':
            result = parseFloat(firstOperand.replace(',', '.')) + parseFloat(secondOperand.replace(',', '.'));
            break;
        case '-':
            result = parseFloat(firstOperand.replace(',', '.')) - parseFloat(secondOperand.replace(',', '.'));
            break;
        case '*':
            result = parseFloat(firstOperand.replace(',', '.')) * parseFloat(secondOperand.replace(',', '.'));
            break;
        case '/':
            result = parseFloat(firstOperand.replace(',', '.')) / parseFloat(secondOperand.replace(',', '.'));
            break;
        default:
            return;
    }
    
    currentInput = result.toString().replace('.', ',');
    operation = '';
    firstOperand = '';
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').value = currentInput;
}

// Para responder ao teclado numérico
document.addEventListener('keydown', (event) => {
    if (!isNaN(event.key)) {
        appendNumber(event.key);
    } else if (event.key === ',') {
        appendComma();
    } else if (['+', '-', '*', '/'].includes(event.key)) {
        setOperation(event.key);
    } else if (event.key === 'Enter') {
        calculateResult();
    }
});
