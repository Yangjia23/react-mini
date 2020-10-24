function render(element, container) {
  const dom = createDOM(element); // 创建真实DOM
  container.appendChild(dom);
}

function createDOM(element) { // element {type, props}
  const {type, props} = element
  let dom = ''
  if (typeof type === 'function') {
    // 当 type 是个函数时，可能是函数组件或类组件
    dom = type.isDidactComponent 
      ? handlerClassComponent(element)
      : handlerFunctionComponent(element)
  } else {
    dom = type === "TEXT_ELEMENT"
      ? document.createTextNode(props.nodeValue)
      : document.createElement(type);
  }
  handlerElementProps(dom, props);
  handlerElementChildren(dom, props.children);
  return dom
}

/**
 * 
 * @param {*} dom dom节点
 * @param {*} props 属性对象
 * @description 处理节点上的属性
 */
function handlerElementProps(dom, props) {
  const isProperty = (key) => key !== "children";
  Object.keys(props)
    .filter(isProperty)
    .forEach((name) => {
      // todo style 特殊处理
      if (name === "style") {
        let styleObj = props["style"];
        Object.keys(styleObj).forEach((key) => {
          dom.style[key] = styleObj[key];
        });
      } else {
        dom[name] = props[name];
      }
    });
}

/**
 * 
 * @param {*} dom 
 * @param {*} children 
 * @description 更新子节点
 */
function handlerElementChildren(dom, children) {
  // 处理 children
  children.forEach((child) => {
    render(child, dom);
  });
}

/**
 * @description 函数组件，执行函数，将返回值转换成真实 DOM
 */
function handlerFunctionComponent({type, props}) {
  const renderElement = type(props) //renderElement react元素
  return createDOM(renderElement)
}

/**
 * @description 1、处理类组件，创建类的实例，传入 props
 *              2、执行实例的 render 方法，得到 renderElement
 *              3、将 renderElement 转换成真实 DOM
 */
function handlerClassComponent({type, props}) {
  const classInstance = new type(props)
  const renderElement = classInstance.render()
  return createDOM(renderElement)
}

const DidactDOM = {
  render,
};

export default DidactDOM;
