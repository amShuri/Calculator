let calcValues = [];
let calcOperator = '';
let calcResult = '';
let isBtnEquals = false;

const numberBtn = document.querySelectorAll('.number-btn');
const operatorBtn = document.querySelectorAll('.operator-btn');
const equalsBtn = document.querySelector('.equals-btn');
const clearBtn = document.querySelectorAll('.clear-btn');
const plusmnBtn = document.querySelector('.plusmn-btn');
const multiplyBtn = document.querySelector('#multiply-btn');
const divideBtn = document.querySelector('#divide-btn');
const allBtns = document.querySelectorAll('button');
const input = document.querySelector('.calculator__operation-input');
const result = document.querySelector('.calculator__operation-result');
const calcPattern = /-?\d*\.?\d+/;
const operatorPattern = /[\+\-\/\*]$/;

input.focus();

numberBtn.forEach(function(button) {
    button.addEventListener('click', () => {
        input.value += button.value;
        if(button.value === '.' && input.value.length < 2) {
            input.value = '0.';
        }
    });
});

function getResults() {
    if(calcValues.length < 2 && input.value.match(calcPattern)) {
        input.value.match(/[.-]/g) ? input.value = input.value.slice(0,17) : input.value = input.value.slice(0,16);
        calcValues.push(+input.value.match(calcPattern));
        result.textContent = `${input.value.match(calcPattern)} ${calcOperator}`;
        input.value = '';
    }

    if(calcOperator === '/' && calcValues[1] === 0) {
        result.textContent = `Let's not do that!`;
        setTimeout(() => {
            result.textContent = '';
        }, 1000);
        calcOperator = '';
        calcValues.splice(0);
    } else if(calcValues.length === 2) {
        operate(calcOperator);
        if(isBtnEquals === true) {
            result.textContent = `${calcValues[0]} ${calcOperator} ${calcValues[1]} =`;
            input.value = calcResult;
            calcValues.splice(0);
        } else {
            result.textContent = `${calcResult} ${calcOperator}`;
            calcValues.splice(0,2,calcResult);
            input.value = '';
        }
        isBtnEquals = false;
    }
    replaceOperators();
}

function replaceOperators() {
    if(result.textContent.includes('*')) {
        result.textContent = result.textContent.replace('*', multiplyBtn.textContent);
    } else if(result.textContent.includes('/')) {
        result.textContent = result.textContent.replace('/', divideBtn.textContent);
    }
}

operatorBtn.forEach(function(button) {
    button.addEventListener('click', () => {
        getResults();
        if(!result.textContent.match(/[0-9]$/)) {
            result.textContent = `${result.textContent.slice(0, -1)} ${button.textContent}`;
            calcOperator = button.value;
        }
    });
});

equalsBtn.addEventListener('click', () => {
    isBtnEquals = true;
    getResults();
});

input.addEventListener('keypress', (e) => {
    if(e.key.match(operatorPattern)) {
        getResults();
        if(!result.textContent.match(/[0-9]$/)) {
            result.textContent = `${result.textContent.slice(0, -1)} ${e.key}`;
            calcOperator = e.key;
            e.preventDefault();
        }
    } else if(e.key === 'Enter') {
        equalsBtn.click();
    } else if(!e.key.match(calcPattern) && e.key !== '.') {
        e.preventDefault();
    }

    if(e.key === '.' && input.value === '') {
        input.value = '0';
    }
    replaceOperators();
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
    if(input.value.includes('-')) {
        input.value = input.value.slice(1);
    } else {
        input.value = '-' + input.value;
    }
});

allBtns.forEach(function(button) {
    button.addEventListener('click', () => {
        input.focus();
    })
})

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