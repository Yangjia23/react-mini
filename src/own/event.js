import { updaterQueue } from "./Component";
/**
 * @param {} dom 绑定事件的 dom 对象
 * @param {} eventType 事件类型
 * @param {} listener 事件处理函数
 * @description 手动实现 addEvent
 */

export function addEvent(dom, eventType, listener) {
  let store = dom.store || (dom.store = {});
  store[eventType] = listener;
  document.addEventListener(eventType.slice(2), dispatchEvent, false);
}

let syntheticEvent = {};
const dispatchEvent = (event) => {
  // 此时 event 为原生 event
  let { type, target } = event; // target 为鼠标点击对象
  const eventType = `on${type}`; // onclick
  updaterQueue.isBatchingUpdate = true;
  // 执行回调
  while(target) {
    const { store } = target;
    const listener = store && store[eventType];
    if (listener) {
      const syntheticEvent = createSyntheticEvent(event);
      listener.call(target, syntheticEvent);
      for (const key in syntheticEvent) {
        // if (syntheticEvent.hasOwnProperty(key)) {
          syntheticEvent[key] = null
        // }
      }
    }
    target = target.parentNode // 冒泡
  }
  updaterQueue.batchUpdate();
};

/**
 *
 * @param {*} event 原生 event 事件对象
 * @returns 浅拷贝包装后的event对象
 */
const createSyntheticEvent = (event) => {
  for (const key in event) {
    // if (event.hasOwnProperty(key)) {
      syntheticEvent[key] = event[key];
    // }
  }
  return syntheticEvent;
};
