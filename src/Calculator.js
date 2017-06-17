import React, { Component } from 'react';

class Calculator extends Component {
  constructor() {
    super();

    this.operators = ['/', 'x', '-', '+'];

    this.state = {
      displayValue: '0',
      operator: '',
      operandA: '',
      operandB: '',
      nextValue: false
    }

    this.sum = this.sum.bind(this);
    this.divide = this.divide.bind(this);
    this.multiply = this.multiply.bind(this);
    this.subtract = this.subtract.bind(this);
  }

  setValue(value) {
    const { displayValue, nextValue, operandB, operandA, operator } = this.state;
    const operators = this.operators;
    let newOperandA = displayValue === '0' ? value : displayValue.concat(value);

    if (this.isOperator(value)) {
      if (!operator) {
        this.setState({
          operator: value,
          nextValue: true
        })
      } else {
        return;
      }
    }
  
    if (nextValue) {
      let newValue = operandA.substr(0, (operandA.length - 1));
      let newOperandB = Boolean(operandB) ? operandB.concat(value) : value;
      let fixedOperandA = Boolean(operandB) ? operandA : newValue;

      this.setState({
        operandA: fixedOperandA,
        operandB: newOperandB,
        displayValue: fixedOperandA + operator + newOperandB
      })

    } else {
      this.setState({
        displayValue: newOperandA,
        operandA: newOperandA
      })
    }
  }

  clearValues() {
    this.setState({
      displayValue: '0',
      operator: '',
      operandA: '',
      operandB: '',
      nextValue: false
    })
  }

  toggleSign(value) {
    const { displayValue } = this.state;
    this.setState({
      displayValue: displayValue.charAt(0) === '-' ? displayValue.substr(1) : '-' + displayValue
    })
  }

  perCent() {
    const { displayValue } = this.state;
    this.setState({
      displayValue: (displayValue / 100).toFixed(3)
    })
    
  }

  addDecimal() {
    const { displayValue, operandA, operandB, nextValue, operator } = this.state;
    let decimalOperandA = operandA.indexOf('.') === -1 ? operandA + '.' : operandA;
    let decimalOperandB = operandB.indexOf('.') === -1 ? operandB + '.' : operandB;

    if (nextValue) {
      this.setState({
        displayValue: decimalOperandA + operator + decimalOperandB,
        operandB: decimalOperandB
      })
    } else {
      this.setState({
        displayValue: decimalOperandA,
        operandA: decimalOperandA
      })
    }
  }

  isOperator(value) {
    return this.operators.indexOf(value) !== -1;
  }
  
  divide(x, y) {
    return parseFloat(x) / parseFloat(y);
  }

  multiply(x, y) {
    return parseFloat(x) * parseFloat(y);
  }

  subtract(x, y) {
    return parseFloat(x) - parseFloat(y);
  }

  sum (x, y) { 
    return parseFloat(x) + parseFloat(y);
  }

  doMath() {
    const { displayValue, operandA, operandB, operator } = this.state;
    const operations = {
      '/': this.divide(operandA, operandB),
      'x': this.multiply(operandA, operandB), 
      '-': this.subtract(operandA, operandB),
      '+': this.sum(operandA, operandB)
    }
    let result = operations[operator];

    if(result !== undefined){
      this.setState({
        displayValue: String(result).indexOf('.') > 0 ? String(result.toFixed(3)) : String(result),
        nextValue: false,
        operandA: '',
        operandB: '',
        operator: ''
      })
    }    
  }


render() {
  const { displayValue } = this.state;
    return (
      <div id="calculator">
        <div id="screen">
          <div id="math">{ displayValue }</div>
          <div id="result">{ displayValue }</div>
        </div>
        <div id="keypad">
          <div className='rows'>
            <div className="key" onClick={() => this.clearValues()}>C</div>
            <div className="key" onClick={() => this.toggleSign()}>±</div>
            <div className="key" onClick={() => this.perCent()}>%</div>
            <div className="key" onClick={() => this.setValue('/')}>÷</div>
          </div>
          <div className='rows'>
            <div className="key" onClick={() => this.setValue('7')}>7</div>
            <div className="key" onClick={() => this.setValue('8')}>8</div>
            <div className="key" onClick={() => this.setValue('9')}>9</div>
            <div className="key" onClick={() => this.setValue('x')}>x</div>
          </div>
          <div className='rows'>
            <div className="key" onClick={() => this.setValue('4')}>4</div>
            <div className="key" onClick={() => this.setValue('5')}>5</div>
            <div className="key" onClick={() => this.setValue('6')}>6</div>
            <div className="key" onClick={() => this.setValue('-')}>-</div>
          </div>
          <div className='rows'>
            <div className="key" onClick={() => this.setValue('1')}>1</div>
            <div className="key" onClick={() => this.setValue('2')}>2</div>
            <div className="key" onClick={() => this.setValue('3')}>3</div>
            <div className="key" onClick={() => this.setValue('+')}>+</div>
          </div>
          <div className='rows'>
            <div className="key" onClick={() => this.setValue('0')}>0</div>
            <div className="key" onClick={() => this.addDecimal('.')}>.</div>
            <div id='orange' className="key" onClick={() => this.doMath()}>=</div>
          </div>
        </div>

      </div>
    )
  }
}

export default Calculator;
