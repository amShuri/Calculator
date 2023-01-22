const numberBtn = document.querySelectorAll('.number-btn');
const operatorBtn = document.querySelectorAll('.operator-btn');
const input = document.querySelector('.calculator__operation-input');

numberBtn.forEach(function(button) {
    button.addEventListener('click', () => {
        input.value += button.value;
    });
});

operatorBtn.forEach(function(button) {
    button.addEventListener('click', () => {
        input.value += button.value;
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

function operate(operator, ...calcValues) {
    switch(operator) {
        case '+':
            console.log(add(...calcValues));
            break;
        case '-':
            console.log(subtract(...calcValues));
            break;
        case '*':
            console.log(multiply(...calcValues));
            break;
        case '/':
            console.log(divide(...calcValues));
            break;
    }
}