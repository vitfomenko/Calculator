'use strict';

class Button {
    constructor(char) {
        const button = document.createElement('button');

            const btnClasses = ['calculator__btn'];

                switch (char) {
                    case '=':
                        btnClasses.push('calculator__btn--green');
                        break;

                    case '+':
                    case '-':
                    case '*':
                    case '/':
                    case '.':
                        btnClasses.push('calculator__btn--yellow');
                        break;

                    case 'c':
                        btnClasses.push('calculator__btn--red');
                        break;

                    default:
                        btnClasses.push('calculator__btn--blue');
                }

                button.className = btnClasses.join(' ');
                button.textContent = char;
                button.setAttribute('data-char', char);

                return button;
    }
}

class Calculator {
    constructor(id) {
        // creating
        this.a = '';
        this.b = '';
        this.sign = '';
        this.calculator = document.createElement('div');

        const chars = [
            '7','8','9','/',
            '4','5','6','*',
            '1','2','3','-',
            '.','0','c','+',
            '='
        ];

        // styling
        this.calculator.className = 'calculator';
        this.calculator.innerHTML = `
            <input type="text" class="calculator__input" disabled>
            <div class="calculator__btns"></div>
        `;

        this.input = this.calculator.firstElementChild;

        const btns = chars.map(char => {
            return new Button(char);
        });

        // adding listeners
        this.calculator.addEventListener('click', this.onClickHandler.bind(this));

        // appending
        this.calculator.lastElementChild.append(...btns);

        return this.calculator;
    }

    onClickHandler(e) {
        const btn = e.target;

        if(btn.tagName !== 'BUTTON') return;

        const { char } = btn.dataset;

        switch (char) {
            case '=':
               return this.calculate();

            case '+':
            case '-':
            case '*':
            case '/':
                if (this.sign) {
                    this.calculate();
                }

                this.sign = char;
                break;
            
            case 'c':
                this.reset();
                return;

            case '.':
            default: // 0-9
                if (!this.sign) {
                    if (char === '.' && this.a.includes('.')) return;

                    if (char !== '.' && this.a.startsWith('0')) {
                        this.a = char;
                    } else {
                        this.a += char;
                    }
                } else {
                    if (char === '.' && this.b.includes('.')) return;

                    if (char !== '.' && this.b.startsWith('0')) {
                        this.b = char;
                    } else {
                        this.b += char;
                    }
                }
                
        }
        
        
        console.log('[a]', this.a);
        console.log('[b]', this.b);
        console.log('[sign]', this.sign);
        console.log('-----------------------------');

        this.printResult();
    }

    calculate() {
        if (!this.a || !this.b || !this.sign) {
            return alert('You should enter both values and a sign.');
        }

        let result;

        switch(this.sign) {
            case '+': 
                result = +this.a + +this.b;
                break;

            case '-': 
                result = this.a - this.b;
                break;

            case '*': 
                result = this.a * this.b;
                break;

            case '/': 
                result = this.a / this.b;
                break;
        }

                this.input.value = result;
                this.a = result;
                this.b = '';
                this.sign = '';
    }

    reset() {
        this.a = '';
        this.b = '';
        this.sign = '';
        this.input.value = '';
    }

    printResult() {
        const char = this.sign && ` ${this.sign} `;

        this.input.value = this.a + char + this.b;
    }

}


const calculator = new Calculator();

document.querySelector('#root').append(calculator);