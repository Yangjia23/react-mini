/** @jsxRuntime classic * / 
/** @jsx Didact.createElement */

import Didact from "./own/didact";
import DidactDOM from "./own/didact-dom";

class ClassSection extends Didact.Component {
  state = {
  	count: 0
  }
  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);
    setTimeout(() => {
      this.setState({ count: this.state.count + 1 });
      console.log(this.state.count);
      this.setState({ count: this.state.count + 1 });
      console.log(this.state.count);
    });
  };
  parentClick = () => {
    console.log('parent click')
  }
  render() {
    return (
      <div className="child-section" onClick={this.parentClick}>
        <div>{this.state.count}</div>
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    );
  }
}

const element = <ClassSection />;

DidactDOM.render(element, document.getElementById("root"));
