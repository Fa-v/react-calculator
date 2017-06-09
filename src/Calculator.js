import React, { Component } from 'react';


class Calculator extends Component {
  
  constructor(props) {
    super(props);
    this.keypad = [
      ['C', '±', '%', '÷'],
      [7, 8, 9, 'x'],
      [4, 5, 6, '-'],
      [1, 2, 3, '+'],
      [0, '', '.', '=']
    ];
      this.state = {
        displayValue: 0
    }
  };  
  
  render() {
    return (
      <div id="calculator">
        <div id="screen">
          <div id="math">1000x10</div>
          <div id="result">10000.004</div>
        </div>
        <div id="keypad">
          {this.keypad.map((row, index) => {            
            var keys = row.map(cell => {
              return (
                <div
                  key={cell}
                  className="key"
                  id={cell === '=' ? 'orange' : null}>
                  {cell}
                </div>
              );
            });
            return (
              <div
                key={index}
                className="rows">
                {keys}
              </div>
            )
          })}
        </div>

      </div>
    )
  }
}

export default Calculator;
