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