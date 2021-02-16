class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.readyToReset = false;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;

        if (this.previousOperand !== '') {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);

        if (this.operation === '+') {
            computation = this.fixFloatingPoint(prev + curr);
            this.currentOperand = computation;
            this.operation = undefined;
            this.previousOperand = '';
        }
        
        if (this.operation === '-') {
            computation = this.fixFloatingPoint(prev - curr);
            this.currentOperand = computation;
            this.operation = undefined;
            this.previousOperand = '';
        }
        
        if (this.operation === '*') {
            computation = this.fixFloatingPoint(prev * curr);
            this.currentOperand = computation;
            this.operation = undefined;
            this.previousOperand = '';
        }

        if (this.operation === '÷') {
            computation = this.fixFloatingPoint(prev / curr);
            this.currentOperand = computation;
            this.operation = undefined;
            this.previousOperand = '';
        }

        if (this.operation === 'pow') {
            computation = this.fixFloatingPoint((prev) ** curr);
            if (isNaN(computation)) {
                computation = null;
            }
            this.currentOperand = computation;
            this.operation = undefined;
            this.previousOperand = '';
        }

        if (this.operation === '%') {
            computation = this.fixFloatingPoint(prev % curr);
            this.currentOperand = computation;
            this.operation = undefined;
            this.previousOperand = '';
        }
        if (isNaN(prev) || isNaN(curr)) return;

        this.readyToReset = true;
    }

    changeSign() {
        this.currentOperand = this.currentOperand * (-1);
    }

    sqrtNumber() {
        if (parseFloat(this.currentOperand) < 0 && !isNaN(parseFloat(this.currentOperand))) {
            this.currentOperand = null;
        } else {
            this.currentOperand = this.currentOperand ** (0.5)
            this.compute();
            this.readyToReset = true;
        }
    }

    factorial(number) {
        number = parseFloat(this.currentOperand)
        let mult = 1

        for (let i = 1; i <= number; i++) {
            mult = mult * i;
        }

        this.currentOperand = mult;
        this.compute();
        this.readyToReset = true;
        return mult
    }


    fixFloatingPoint = val => val = Number.parseFloat(val.toPrecision(15));

    getDisplayNumber(number) {
        try {
            const stringNumber = number.toString();
            const integerDigits = parseFloat(stringNumber.split('.')[0])
            const decimalDigits = stringNumber.split('.')[1]
            let integerDisplay;
            if (isNaN(integerDigits)) {
                integerDisplay = '';
            } else {
                integerDisplay = integerDigits.toLocaleString('en', {
                    maximumFractionDigits: 0
                })
            }
            if (decimalDigits != null) {
                return `${integerDisplay}.${decimalDigits}`
            } else {
                return integerDisplay;
            }
        } catch (e) {
            this.clear();
            return 'Error';
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);

        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } 
        
        else {
            this.previousOperandTextElement.innerText = '';
        }
        
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const pmButton = document.querySelector('[data-pm]');
const sqrtButton = document.querySelector('[data-sqrt]');
const factorialButton = document.querySelector('[data-factorial]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (calculator.previousOperand === '' && calculator.currentOperand !== '' && calculator.readyToReset) {
            calculator.currentOperand = '';
            calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

pmButton.addEventListener('click', button => {
    calculator.changeSign();
    calculator.updateDisplay();
})

sqrtButton.addEventListener('click', button => {
    calculator.sqrtNumber();
    calculator.updateDisplay();
})

factorialButton.addEventListener('click', button => {
    calculator.factorial();
    calculator.updateDisplay();
})