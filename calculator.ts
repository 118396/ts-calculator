{
    class Calculator {
        public container: HTMLDivElement
        private output: HTMLDivElement
        private span: HTMLSpanElement
        public n1: string = null
        public n2: string = null
        public operator: string = null
        public result: string = null
        public keys: Array<Array<string>> = [
            //数组<数组<字符串>>
            ["Clear", "÷"],
            ["7", "8", "9", "×"],
            ["4", "5", "6", "－"],
            ["1", "2", "3", "+"],
            ["0", ".", "="]
        ]
        constructor() {
            this.createContainer()
            this.createOutput()
            this.createButtons()
            this.bindEvents()
        }

        createButton(text: string, container: HTMLElement, className: string) {
            let button: HTMLButtonElement = document.createElement('button');
            button.textContent = text
            if (className) {
                button.className = className
            }
            container.appendChild(button)
            return button;
        }
        createContainer() {
            let container: HTMLDivElement = document.createElement('div')
            container.classList.add('calculator')
            document.body.appendChild(container)
            this.container = container
        }
        createOutput() {
            let output: HTMLDivElement = document.createElement('div')
            output.classList.add('output')
            let span: HTMLSpanElement = document.createElement('span')
            span.textContent = '0'
            output.appendChild(span)
            this.container.appendChild(output)
            this.output = output
            this.span = span
        }
        createButtons() {
            this.keys.forEach((textList: Array<string>) => {
                let div: HTMLDivElement = document.createElement('div')
                div.classList.add('row')
                textList.forEach((text: string) => {
                    this.createButton(text, div, `button text-${text}`)
                })
                this.container.appendChild(div)
            });
        }
        bindEvents() {
            this.container.addEventListener('click', (event) => {
                if (event.target instanceof HTMLButtonElement) {
                    let button: HTMLButtonElement = event.target
                    let text = button.textContent
                    this.updateNumberOrOperator(text)
                }
            })
        }
        updatedNumber(name: string, text: string): void {
            if (this[name]) {
                this[name] += text
            } else {
                this[name] = text
            }
            this.span.textContent = this[name].toString()
        }
        updatedNumbers(text: string): void {
            if (this.operator) {
                this.updatedNumber('n2', text)
            } else {
                this.updatedNumber('n1', text)
            }
        }
        updatedResult(): void {
            let result
            let n1: number = parseFloat(this.n1)
            let n2: number = parseFloat(this.n2)
            if (this.operator === '+') {
                result = n1 + n2
            } else if (this.operator === '－') {
                result = n1 - n2
            } else if (this.operator === '×') {
                result = n1 * n2
            } else if (this.operator === '÷') {
                result = n1 / n2
            }
            result = result
                .toPrecision(12)
                .replace(/0+$/g, '')
                .replace(/0+e/g, 'e')
            if (n2 === 0) {
                result = '不是数字'
            }
            this.span.textContent = result
            this.n1 = null
            this.n2 = null
            this.operator = null
            this.result = result
        }
        updateOperator(text) {
            if (this.n1 === null) {
                this.n1 = this.result
            }
            this.operator = text
        }
        updateNumberOrOperator(text: string): void {
            if ('0123456789.'.indexOf(text) >= 0) {
                this.updatedNumbers(text)
            } else if ('+－÷×'.indexOf(text) >= 0) {
                this.updateOperator(text)
            } else if ('='.indexOf(text) >= 0) {
                this.updatedResult()
            } else if (text === 'Clear') {
                this.n1 = null
                this.n2 = null
                this.operator = null
                this.result = null
                this.span.textContent = '0'
            }
        }
    }
    new Calculator()
}



