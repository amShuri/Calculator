let calcValues = [];
let calcOperator = '';
let calcResult = '';
let isBtnEquals;

const numberBtn = document.querySelectorAll('.number-btn');
const operatorBtn = document.querySelectorAll('.operator-btn');
const equalsBtn = document.querySelector('.equals-btn');
const clearBtn = document.querySelectorAll('.clear-btn');

const input = document.querySelector('.calculator__operation-input');
const result = document.querySelector('.calculator__operation-result')
const calcPattern = /\d+/;
const operatorPattern = /[\+\-\/\*]/;

numberBtn.forEach(function(button) {
    button.addEventListener('click', () => {
        input.value += button.value;
    });
});

operatorBtn.forEach(function(button) {
    button.addEventListener('click', () => {
        if(calcOperator === '') {
            calcOperator = button.value;
        }
        getResults();
        if(result.textContent.match(operatorPattern)) {
            result.textContent = result.textContent.slice(0,-1) + button.value;
            calcOperator = button.value;
        }
    });
});

equalsBtn.addEventListener('click', () => {
    isBtnEquals = true;
    if(calcOperator !== '') {
        getResults(calcOperator);
    }
});

function getResults() {
    if(calcValues.length < 2 && input.value.match(calcPattern)) {
        calcValues.push(+input.value.match(calcPattern));
        result.textContent = `${input.value.match(calcPattern)} ${calcOperator}`;
        input.value = '';
    }

    if(calcValues.length === 2) {
        operate(calcOperator);
        if(isBtnEquals) {
            result.textContent = `${calcValues[0]} ${calcOperator} ${calcValues[1]} =`;
            input.value = calcResult;
            calcValues.splice(0);
        } else {
            result.textContent = `${calcResult} ${calcOperator}`;
            calcValues.splice(0,2,calcResult);
            input.value = '';
        }
        calcOperator = '';
        isBtnEquals = false;
    }
}

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

function add(...arg) {
    return arg.reduce((total, curr) => total + curr);
}

function subtract(...arg) {
    return arg.reduce((total, curr) => total - curr);
}

function multiply(...arg) {
    return arg.reduce((total, curr) => total * curr);
}

function divide(...arg) {
    return arg.reduce((total, curr) => total / curr);
}

function operate(operator) {
    switch(operator) {
        case '+':
            calcResult = add(...calcValues);
            break;
        case '-':
            calcResult = subtract(...calcValues);
            break;
        case '*':
            calcResult = multiply(...calcValues);
            break;
        case '/':
            calcResult = divide(...calcValues);
            break;
    }
}