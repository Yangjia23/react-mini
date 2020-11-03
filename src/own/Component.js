import {createDOM} from './didact-dom'

export const updaterQueue = {
  isBatchingUpdate: false, // 是否异步更新
  updaters: new Set(),
  addUpdater (updater) {
    this.updaters.add(updater)
  },
  batchUpdate () {
    this.updaters.forEach(updater => {
      updater.updateComponent()
    })
    this.isBatchingUpdate = false
  }
}

class Updater {
  constructor (classInstance) {
    this.classInstance = classInstance
    this.pendingState = []
  }
  addState (partialState) {
    this.pendingState.push(partialState)
    updaterQueue.isBatchingUpdate
      ? updaterQueue.addUpdater(this)
      : this.updateComponent() // 暂时同步更新
  }
  updateComponent () {
    const {classInstance, pendingState} = this
    if (!pendingState.length) return false
    classInstance.state = this.getClassInstanceState()
    classInstance.forceUpdate()
  }
  getClassInstanceState () {
    let {classInstance, pendingState} = this
    let {state} = classInstance
    pendingState.forEach(nextState => {
      if (typeof nextState === 'function') {
        nextState = nextState(state)
      }
      state = {...state, ...nextState}
    })
    pendingState.length = 0
    return state
  } 
}
class Component {
  static isDidactComponent = true
  constructor(props) {
    this.props = props
    this.state = {}
    // 每个组件实例都存在一个 Updater 实例
    this.updater = new Updater(this)
  }
  setState (partialState) {
    this.updater.addState(partialState)
  }
  forceUpdate() {
    const renderElement = this.render() // 获取最新的 react 元素
    updateClassInstance(this, renderElement)
  }
}

function updateClassInstance(classInstance, element) {
  let oldDOM = classInstance.dom; //旧的真实 DOM
  let newDOM = createDOM(element)
  oldDOM.parentNode.replaceChild(newDOM, oldDOM)
  classInstance.dom = newDOM
}

export default Component