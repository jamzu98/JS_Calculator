let firstValue = '';
let secondvalue = '';
let currentOperation = null;
let operationReady = false;

const operatorButton = document.querySelectorAll('[data-operator]');
const numberButton = document.querySelectorAll('[data-number]');
const decimalButton = document.querySelector('#decimalButton');
const equalsButton = document.querySelector('#equalsButton');
const clearButton = document.querySelector('#clearButton');
const deleteButton = document.querySelector('#deleteButton');
const inputDisplay = document.querySelector('.input-screen');
const outputDisplay = document.querySelector('.output-screen');
const copyrightYear = document.querySelector('#copyrightYear');

equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
decimalButton.addEventListener('click', addDecimal);
window.addEventListener('keydown', keyboardInputHandler)

numberButton.forEach((button) =>
    button.addEventListener('click', () => addNumber(button.textContent))
);

operatorButton.forEach((button) => button.addEventListener('click', ()=> setOperation(button.textContent))
);

function addNumber(number){
    if(inputDisplay.textContent === '0' || operationReady) {
        resetScreen();
    }
    inputDisplay.textContent += number;
}

function resetScreen() {
    inputDisplay.textContent = '';
    operationReady = false;
}

function clear(){
    inputDisplay.textContent = '';
    outputDisplay.textContent = '';
    firstValue = '';
    secondvalue = '';
    currentOperation = null;
}

function deleteNumber() {
    if(inputDisplay.textContent !== '0' && inputDisplay.textContent !== ''){
        inputDisplay.textContent = inputDisplay.textContent
        .toString()
        .slice(0, -1);
    }
}

function addDecimal(){
    if(operationReady) resetScreen();
    if(inputDisplay.textContent === '') {
        inputDisplay.textContent = 0;
    }
    if(inputDisplay.textContent.includes('.')){
        return;
    }
    inputDisplay.textContent += '.';
}

function setOperation(operator) {
    if(currentOperation !== null) evaluate();
    firstValue = inputDisplay.textContent;
    currentOperation = operator;
    outputDisplay.textContent = `${firstValue} ${currentOperation}`;
    operationReady = true;
}

function evaluate() {
    if(currentOperation === null || operationReady) return;
    if(currentOperation === '÷' && inputDisplay.textContent === '0'){
        inputDisplay.textContent = 'ERROR';
        return;
    }
    secondvalue = inputDisplay.textContent;
    inputDisplay.textContent = roundValue(operate(currentOperation, firstValue, secondvalue));
    outputDisplay.textContent = `${firstValue} ${currentOperation} ${secondvalue} =`;
    currentOperation = null;
}

function roundValue(number) {
    return Math.round(number * 1000) / 1000;
}

function keyboardInputHandler(e) {
    if (e.key >= 0 && e.key <= 9) addNumber(e.key)
    if (e.key === '.') addDecimal()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return '×'
    if (keyboardOperator === '-') return '−'
    if (keyboardOperator === '+') return '+'
}

function add(a, b) {
    return a +b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a ,b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    // operator = window.prompt("Choose: add, substract, multiply or divide");
    a = +(a);
    b = +(b);

    switch(operator){
        case '+': return add(a, b);
        case '−': return substract(a, b);
        case '×': return multiply(a ,b);
        case '÷': if(b === 0) return null; else return divide(a, b);
        default: return null;
    }
}

copyrightYear.textContent = new Date().getFullYear();