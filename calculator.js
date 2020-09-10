export default class Calculator {
  constructor(selector) {
    this.calc = document.querySelector(selector);
    this.#init()
    this.currentOperation = this.calc.querySelector('.current-operation')
    this.accumulator = this.calc.querySelector('.accumulator')
    this.currentValue = this.calc.querySelector('.current-value')
  }

  #init = () => {
    const html = `
      <div class="calculator">
        <div class="value__block">
          <div class="accumulator"></div>
          <div class="current-operation"></div>
          <div class="current-value">0</div>
        </div>
        <div class="btn__block">
          <button class="del">c</button>
          <button class="minus">+/-</button>
          <button class="persant operation">%</button>
          <button class="operation">&#247;</button>
          <button class="btn">7</button>
          <button class="btn">8</button>
          <button class="btn">9</button>
          <button class="operation">&#215;</button>
          <button class="btn">4</button>
          <button class="btn">5</button>
          <button class="btn">6</button>
          <button class="operation">-</button>
          <button class="btn">1</button>
          <button class="btn">2</button>
          <button class="btn">3</button>
          <button class="operation">+</button>
          <button class="null btn">0</button>
          <button class="btn">,</button>
          <button class="eq">=</button>
        </div>
      </div>
    `;
    this.calc.insertAdjacentHTML('afterbegin', html)
    const btns = this.calc.querySelectorAll('.btn')
    btns.forEach(btn => btn.addEventListener('click', e => {
      if(this.currentValue.textContent === '0' && btn.textContent === ','){
        return this.currentValue.textContent += ','
      }
      if(this.currentValue.textContent === '0'){
        return this.currentValue.textContent = btn.textContent
      }
      if(this.currentValue.textContent.includes(',') && btn.textContent === ','){
        return 
      }
      this.currentValue.textContent += btn.textContent
    }))
    const operations = this.calc.querySelectorAll('.operation')
    const del = this.calc.querySelector('.del')
    del.addEventListener('click', this.#clear)
    operations.forEach(operation => operation.addEventListener('click', e => this.#operationHandler(operation)))
    const eq = this.calc.querySelector('.eq')
    eq.addEventListener('click', this.#eqHandler)
    const minus = this.calc.querySelector('.minus')
    minus.addEventListener('click', this.#minusHandler)
  }

  #minusHandler = () => {
    this.currentValue.textContent = (+(this.currentValue.textContent.replace(',', '.')) * -1).toString().replace('.', ',')
  }

  #clear = () => {
    this.currentOperation.textContent = ''
    this.accumulator.textContent = ''
    this.#resetCurrentValue()
  }

  #eqHandler = () => {
    if(this.accumulator.textContent === ''){
      return
    }
    const result = this.#operation()
    this.#clear()
    this.currentValue.textContent = result.toString().replace('.', ',')
  }

  #operationHandler = (oper) => {
    if(this.accumulator.textContent === '') {
      this.accumulator.textContent = this.currentValue.textContent
    }
    if(this.currentOperation.textContent !== ''){
      this.accumulator.textContent = this.#operation().toFixed(10).toString().replace('.', ',')
    }
    this.currentOperation.textContent = oper.textContent
    this.#resetCurrentValue()
  }

  #operation = () => {
    const doc = new DOMParser()
    const op = (o) => doc.parseFromString(o, 'text/html').body.textContent
    const del = op('&#247;')
    const mul = op('&#215;')
    switch (this.currentOperation.textContent) {
      case '+':
        return +(this.accumulator.textContent.replace(',', '.')) + +(this.currentValue.textContent.replace(',', '.'))
      case '-':
        return +(this.accumulator.textContent.replace(',', '.')) - +(this.currentValue.textContent.replace(',', '.'))
      case del:
        return +(this.accumulator.textContent.replace(',', '.')) / +(this.currentValue.textContent.replace(',', '.'))
      case mul:
        return +(this.accumulator.textContent.replace(',', '.')) * +(this.currentValue.textContent.replace(',', '.'))
      case '%':
        return +(this.accumulator.textContent.replace(',', '.')) / 100 * +(this.currentValue.textContent.replace(',', '.'))
      default:
    }
  }

  #resetCurrentValue = () => {
    this.currentValue.textContent = 0
  }


}
