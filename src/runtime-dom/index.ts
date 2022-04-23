/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-24 01:35:59
 * @LastEditTime: 2022-04-24 01:49:00
 * @FilePath: \mini-vue3\src\runtime-dom\index.ts
 */
import { createRenderer } from '../runtime-core/index';
// 用于创建元素
function createElement(type) {
  // 利用 document.createElement() 创建 DOM 元素
  return document.createElement(type);
}

// 用于将 props 对象中的 property 或方法挂载到元素上
function patchProp(el, key, val) {
  // 用于通过正则判断该 property 的 key 是否以 on 开头，是则为注册事件，否则为 attribute 或 property
  const isOn = (key: string) => /^on[A-Z]/.test(key);

  // 若为注册事件
  if (isOn(key)) {
    const event = key.slice(2).toLowerCase();
    // 利用 Element.addEventListener() 将方法挂载到元素上
    el.addEventListener(event, val);
  }
  // 否则
  else {
    // 利用 Element.setAttribute() 将 property 挂载到元素上
    el.setAttribute(key, val);
  }
}

// 用于将元素添加到根容器/父元素中
function insert(el, parent) {
  // 利用 Element.append() 将元素添加到根容器/父元素中
  parent.append(el);
}

// 用于创建文本节点
function createText(text) {
  // 利用 document.createTextNode() 创建文本节点
  return document.createTextNode(text);
}

// 调用 createRenderer 函数，并传入包含 createText 函数、createElement 函数、patchProp 函数和 insert 函数的对象
const renderer: any = createRenderer({
  createElement,
  patchProp,
  insert,
  createText
});

// 用于创建应用实例
function createApp(...args) {
  // 调用 createRenderer 函数返回对象的 createApp 方法
  return renderer.createApp(...args);
}

export { createApp };
export * from '../runtime-core/index';