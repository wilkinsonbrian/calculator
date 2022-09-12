const buttons = document.querySelectorAll('button');
const entry = document.querySelector('.display');

// Set initial states of variables
entry.textContent = "0";
let operandOne = "";
let operandTwo = "";
let equalsClicked = false;
let prevOperator = "";
let currentOper = "";
let lastKeyClicked = "";

function add(a, b) {
    return a + b;
}

function divide(a, b) {
    return a / b;
}

function multiply(a, b) {
    return a * b;
}

function subtract(a, b) {
    return a - b;
}

function clear() {
    entry.textContent = 0;
    operandOne = "";
    operandTwo = "";
    equalsClicked = false;
    prevOperator = "";
}

function updateEntry(result, oper) {
    if (equalsClicked) {
        equalsClicked = false;
        entry.textContent = result;
        prevOperator = "";
        operandOne = "";
    } else {
        entry.textContent = result + currentOper;
        operandOne = result;  
    }
    operandTwo = "";
}



function operate(a, b, oper) {
    a = parseFloat(a);
    b = parseFloat(b);
    let result = 0;
    if (oper === "+") {
        result = add(a, b);
    } else if (oper === "-") {
        result = subtract(a, b);
    } else if (oper === "/") {
        result = divide(a, b);
    } else if (oper === "*") {
        result = multiply(a, b);
    } 
    updateEntry(result, oper);
}

/**
 * Default entry when the calculator starts, or the clear button is pressed is a 0.
 * If a 0 is present, it will be erased and the newly pressed key display. If there
 * is already something present, the newly pressed key will be concatenated to the end.
 * @param {*} num - The key that was just pressed. Could also be an operator or decimal.
 */
function clickedNumber(num) {
    currentEntry = entry.textContent;
    if (currentEntry === "0") {
        entry.textContent = num;
    } else {
        entry.textContent += num;
    }
    
}

/**
 * Assigns values to each of the operands. If the first operand is already set, looks back to the previous
 * operator and gets the text (the number) from that index on. 
 * @param {*} oper 
 */
function clickedOperator(oper) {
    if (oper === "=") {
        if (operandOne === "") {
            return; // ignore the equals sign until both numbers have been entered.
        }
        equalsClicked = true;
    }
    if (operandOne === "") {
        operandOne = entry.textContent;
        prevOperator = oper;
        entry.textContent += oper;
    } else {
        let opIndex = entry.textContent.indexOf(prevOperator);
        operandTwo = entry.textContent.substring(opIndex+1);
        currentOper = oper;
        operate(operandOne, operandTwo, prevOperator);
        prevOperator = currentOper;
    }
    document.getElementById("decimal").disabled = false; // Let the user enter decimals again. 
}

function clickedKey() {
    const clicked = this.textContent;
    currentEntry = entry.textContent;
    if (clicked === "C") {
        clear();
        return; // ignore the rest of this function
    }
    if (clicked === ".") {
        document.getElementById("decimal").disabled = true;
        clickedNumber(clicked); // treat the decimal as a number, not an operator
    }
    else if (isNaN(clicked)) { // If an operator was clicked
        if (!isNaN(lastKeyClicked)) {
            clickedOperator(clicked);
        }  
    } else {
        clickedNumber(clicked);
    }

    if (clicked === "=") {
        lastKeyClicked = "";
    } else {
        lastKeyClicked = clicked;
    }
}


buttons.forEach(button => button.addEventListener('click', clickedKey));