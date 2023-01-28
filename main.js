const numberBtn = document.querySelectorAll('.number-btn');
const operatorBtn = document.querySelectorAll('.operator-btn');
const equalsBtn = document.querySelector('.equals-btn');
const clearBtn = document.querySelectorAll('.clear-btn');
const plusmnBtn = document.querySelector('.plusmn-btn');
const multiplyBtn = document.querySelector('#multiply-btn');
const divideBtn = document.querySelector('#divide-btn');
const allBtns = document.querySelectorAll('button');
const decimalBtn = document.querySelector('.decimal-btn');
const input = document.querySelector('.calculator__operation-input');
const result = document.querySelector('.calculator__operation-result');
const calcPattern = /-?\d*\.?\d+/;
const operatorPattern = /[\+\-\/\*]$/;
let calcValues = [];
let calcOperator = '';
let calcResult = '';
let isItActive = true;
input.focus();

function calculateWithOperators() {
    if (calcValues.length < 2 && input.value.match(calcPattern)) {
        // Slice the input from 0 to 16 digits.
        input.value.match(/[.-]/g) ? input.value = input.value.slice(0,17) : input.value = input.value.slice(0,16);
        calcValues.push(+input.value.match(calcPattern));
        result.textContent = `${input.value.match(calcPattern)} ${calcOperator}`;
    }
    
    if (calcValues.length === 2 && calcOperator !== '') {
        operate(calcOperator);
        result.textContent = `${calcResult} ${calcOperator}`;
        calcValues.splice(0,2,calcResult);
        input.value = calcResult;
    } /**
       * Keep the array's length at 1 if no operator is defined,
       * which happens when a value is pushed using the equals button.
       */ 
      else if (calcValues.length === 2 && calcOperator === '') {
        calcValues.splice(0,1);
    }
    isItActive = true;
}

function calculateWithEquals() {
    if (calcValues.length < 1 && input.value !== '') {
        result.textContent = input.value.match(calcPattern);
        calcValues.push(+input.value.match(calcPattern));
    } else if (calcValues.length >= 1 && input.value !== '' && calcOperator !== '') {
        calcValues.push(+input.value.match(calcPattern));
        operate(calcOperator);
        result.textContent = `${calcValues[0]} ${calcOperator} ${calcValues[1]} =`;
        input.value = calcResult;
        calcValues.splice(0,2,calcResult);
        calcOperator = '';
    } 
    /** 
     * Makes it possible to push one value into the array
     * by using the equals button.
     */
      else if (input.value !== '') {
        result.textContent = input.value;
        calcValues.splice(0,1,+input.value);
    }
    
    /**
     * If any value is entered or re-entered by using the equals
     * button and then an operator is added, that same value is
     * shown in the input without the operator next to it.
     */
    if (!result.textContent.includes('=') && calcValues.length < 2) {
        input.value = result.textContent.match(calcPattern);
    } else if (result.textContent.includes('=')) {
        input.value = calcResult;
    }
    
    if (calcValues.length > 0) {
        input.classList.add('input-color');
    }
    isItActive = true;
}

/**
  * Doesn't have any impact on functionality, this is simply
  * a display update of operators, from / and * to ÷ and ×.
  */
function updateOperatorsDisplay() {
    if (result.textContent.includes('*')) {
        result.textContent = result.textContent.replace('*', multiplyBtn.textContent);
    } else if (result.textContent.includes('/')) {
        result.textContent = result.textContent.replace('/', divideBtn.textContent);
    }
}

// Updates the operator that is used in each operation.
function switchOperators(operatorSwitch) {
    if (!result.textContent.match(/[0-9=?]$/g) && result.textContent !== '') {
        result.textContent = `${result.textContent.slice(0, -1)} ${operatorSwitch}`;
    } else if (result.textContent.includes('=')) {
        result.textContent = `${calcValues[0]} ${operatorSwitch}`;
    } else if (result.textContent === '') {
        result.textContent = `0 ${operatorSwitch}`;
        calcValues.push(0);
    }

    /** 
     * Makes it so an operator can be added when a value has
     * already been pushed using the equals button.
     */
    if (result.textContent.match(/[0-9]$/)) {
        result.textContent += ` ${operatorSwitch}`
        isItActive = false;
    }
    calcOperator = operatorSwitch;
    isItActive = true;
    input.classList.add('input-color');
    input.value = result.textContent.match(calcPattern);
}

// Overwrite any existing value in the input.
allBtns.forEach(function(button) {
    button.addEventListener('click', () => {
        if (result.textContent !== '' && isItActive === true) {
            input.classList.remove('input-color');
            input.value = '';
            isItActive = false;
        }
    });
});

numberBtn.forEach(function(button) {
    button.addEventListener('click', () => {
        input.value += button.value;
    });
});

operatorBtn.forEach(function(button) {
    button.addEventListener('click', () => {
        calculateWithOperators();
        switchOperators(button.value);
        updateOperatorsDisplay();
    });
});

equalsBtn.addEventListener('click', () => {
    calculateWithEquals();
    updateOperatorsDisplay();
});

document.addEventListener('keypress', (e) => {
    /**
     * Overwrite any existing value in the input,
     * only when isItActive is true.
     */ 
    if (result.textContent !== '' && isItActive === true) {
        input.classList.remove('input-color');
        input.value = '';
        isItActive = false;
    }

    if (e.key.match(calcPattern)) {
        input.focus();
    }

    if (e.key.match(operatorPattern)) {
        calculateWithOperators();
        switchOperators(e.key);
        e.preventDefault();
    } else if (e.key === 'Enter') {
        calculateWithEquals();
    }
    
    // Only numbers, operators, and the decimal point will work.
    if (e.key !== '.' && !e.key.match(calcPattern)) {
        e.preventDefault();
    } else if (e.key === '.' && input.value.includes('.')) {
        e.preventDefault();
    } else if (e.key === '.' && input.value === '') {
        input.value = '0';
    }
    updateOperatorsDisplay();
});

clearBtn.forEach(function(button) {
    button.addEventListener('click', () => {
        switch(button.value) {
            case 'C':
                input.value = '';
                result.textContent = '';
                calcValues.splice(0);
                calcOperator = '';
                calcResult = '';
                break;
            case 'CE':
                input.value = '';
                break;
            case 'DEL':
                input.value = input.value.slice(0,-1);
                break;
        }
    });
});

plusmnBtn.addEventListener('click', () => {
    if (input.value.includes('-')) {
        input.value = input.value.slice(1);
    } else {
        input.value = '-' + input.value;
    }
});

decimalBtn.addEventListener('click', () => {
    input.value += decimalBtn.value;
    decimalBtn.disabled = true;
    if (input.value.length < 2) {
        input.value = '0.';
    }
    /**
     * Re-enable the decimal point button when any other button is
     * clicked, as long as the decimal point is not present in the input.
     */
    allBtns.forEach(function(button) {
        button.addEventListener('click', () => {
            if (!input.value.includes('.')) {
                decimalBtn.disabled = false;
            }
        });
    });
});

function add(...arg) {
    return arg.reduce((total, curr) => +(total + curr).toFixed(2));
}

function subtract(...arg) {
    return arg.reduce((total, curr) => +(total - curr).toFixed(2));
}

function multiply(...arg) {
    return arg.reduce((total, curr) => +(total * curr).toFixed(2));
}

function divide(...arg) {
    return arg.reduce((total, curr) => +(total / curr).toFixed(2));
}

function operate(operator) {
    if(calcOperator === '/' && input.value.match(/^[0.]+$/)) {
        /**
         * The result.textContent is modified after the operate
         * function is called. The Timeout waits for that modification
         * to happen to be able to update the textContent.
         */
        setTimeout(() => {
            result.textContent = result.textContent.slice(0,-1) + '????';    
            calcOperator = '';
        }, 0);
    } else {
        switch(operator) {
            case '+':
                calcOperator = '+';
                calcResult = add(...calcValues);
                break;
            case '-':
                calcOperator = '-';
                calcResult = subtract(...calcValues);
                break;
            case '*':
                calcOperator = '*';
                calcResult = multiply(...calcValues);
                break;
            case '/':
                calcOperator = '/';
                calcResult = divide(...calcValues);
                break;
        }
    }
}