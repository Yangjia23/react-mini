import Component from './Component'

/**
 * 
 * @param {*} type 
 * @param {*} props 
 * @param  {...any} children 
 * @description 1、props 采用解构赋值，而children 使用剩余参数
 *              2、children数组中，可能包含 string,number ，将其包装成对象，方便统一处理
 */

function createElement(type, props, ...children) {
  let ref 
  if (props) {
    ref = props.ref
    delete props.ref
  }
  // ref 和 props 同级
  return {
    type,
    props: {
      ...props,
      children: children.map(child => 
        typeof child === 'object'
          ? child
          : createTextElement(child)
      ),
    },
    ref
  }
}

/**
 * 
 * @param {*} text 文本
 * @description 创建文本元素
 */
function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

/**
 * @description 创建ref
 */
function createRef() {
  return {current: null}
}

const Didact = {
  createElement,
  createRef,
  Component
}

export default Didact