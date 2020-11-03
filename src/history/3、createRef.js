/** @jsxRuntime classic * / 
/** @jsx Didact.createElement */

import Didact from "./own/didact";
import DidactDOM from "./own/didact-dom";

class ClassSection extends Didact.Component {
  constructor (props) {
    super(props);
    this.a = Didact.createRef() // {current: null}
    this.b = Didact.createRef()
    this.sum = Didact.createRef()
  }
  handleClick = () => {
    const num1 = this.a.current.value
    const num2 = this.b.current.value
    this.sum.current.value = parseFloat(num1) + parseFloat(num2)
  };
  render() {
    return (
      <div className="child-section" onClick={this.parentClick}>
        <div><input ref={this.a}/></div>
        <div>+</div>
        <div>
          <input ref={this.b}/>
          <button onClick={this.handleClick}>=</button>
        </div>
        <div><input ref={this.sum}/></div>
      </div>
    );
  }
}

const element = <ClassSection />;

DidactDOM.render(element, document.getElementById("root"));
