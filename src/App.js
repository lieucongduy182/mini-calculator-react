import React, { Component } from 'react';
import Button from './components/Button';
import './css/style.css';

class App extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      current: '0',
      previous: [],
      nextIsReset: false
    }
  }

  reset = () => {
    this.setState({current: '0', previous: [], nextIsReset: false})
  }

  addToCurrent = (symbol) => {
    // console.log(symbol);
    if (['/','*','-','+'].indexOf(symbol) > -1) {
      let {previous} = this.state;
      previous.push(this.state.current + symbol);
      this.setState({previous, nextIsReset: true});
    } else {
      if ((this.state.current === '0' && symbol !== '.') || this.state.nextIsReset) {
        this.setState({current: symbol, nextIsReset: false}); 
      } else {
        this.setState({current: this.state.current + symbol});
      }
    }
  }

  calculate = () => {
    let {current,previous} = this.state;
    if (previous.length > 0) {
      current = eval(String(previous[previous.length - 1] + current));
      this.setState({current,previous: [], nextIsReset: true})
    }
  }

  render() {
    const buttons = [
      {symbol:'C', col: 3, action: this.reset},
      {symbol:'/', col: 1, action: this.addToCurrent},
      {symbol:'7', col: 1, action: this.addToCurrent},
      {symbol:'8', col: 1, action: this.addToCurrent},
      {symbol:'9', col: 1, action: this.addToCurrent},
      {symbol:'*', col: 1, action: this.addToCurrent},
      {symbol:'4', col: 1, action: this.addToCurrent},
      {symbol:'5', col: 1, action: this.addToCurrent},
      {symbol:'6', col: 1, action: this.addToCurrent},
      {symbol:'-', col: 1, action: this.addToCurrent},
      {symbol:'1', col: 1, action: this.addToCurrent},
      {symbol:'2', col: 1, action: this.addToCurrent},
      {symbol:'3', col: 1, action: this.addToCurrent},
      {symbol:'+', col: 1, action: this.addToCurrent},
      {symbol:'0', col: 2, action: this.addToCurrent},
      {symbol:'.', col: 1, action: this.addToCurrent},
      {symbol:'=', col: 1, action: this.calculate},
    ];
    return (
      <div className="App">
        {this.state.previous.length > 0 ?
          <div className="floaty-last">{this.state.previous[this.state.previous.length -1]}</div>
        : null}
        <input className="result" type="text" value={this.state.current} />
        {buttons.map((btn,i) => {
          return <Button symbol={btn.symbol} col={btn.col} action={(symbol)=>btn.action(symbol)} />
        })}

      </div>
    )
  }
}

export default App;