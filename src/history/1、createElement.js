/**
 * @description 
 * 1、JSX  --babel-->  React.createElement ---> React元素 {type: xx, props: {}} ---> ReactDOM.render --> 真实DOM
 * 2、React元素 中 type 可能是 字符串、数字、函数，当为函数时，表示是 react 组件 =》 函数组件或类组件
 * 3、函数组件 --> 执行函数，得到 renderElement(React元素) -->  真实DOM
 * 4、类组件  -->  new 创建实例，执行实例 render 方法，得到 renderElement(React元素) -->  真实DOM
 */
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