import Didact from './own/didact';
import DidactDOM from './own/didact-dom';

// 1、官方
// const element = (<div title="223">Hello World</div>)
// ReactDOM.render(
//   element,
//   document.getElementById('root')
// );

// 2、普通标签元素
// const element = Didact.createElement('h1', {
//   className: 'title',
//   style: {
//     color: 'red',
//     fontSize: '20px'
//   }
// }, Didact.createElement('span', null, 'Hello'), 'World!!!')


// 3、函数组件
// function FunctionChild () {
//   // return <div className="child-section">ChildSection</div>
//   return Didact.createElement('div', {className: 'child-section'}, 'FunctionChild')
// }

// const element = Didact.createElement(FunctionChild, {title: 'root'})

// 4、类组件
class ClassSection extends Didact.Component {
  render () {
    return Didact.createElement('div', {
      className: 'child-section'
    }, `ClassSection: ${this.props.name}`)
  }
}
const element = Didact.createElement(ClassSection, {name: 'from root'})

DidactDOM.render(element, document.getElementById('root'));