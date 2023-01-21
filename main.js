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