/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-24 01:35:59
 * @LastEditTime: 2022-04-25 01:34:59
 * @FilePath: \mini-vue3\src\runtime-dom\index.ts
 */
import { createRenderer } from '../runtime-core/index';
// 用于创建元素
function createElement(type) {
  // 利用 document.createElement() 创建 DOM 元素
  return document.createElement(type);
}

// 用于将 props 对象中的 property 或方法挂载到元素上
function patchProp(el, key, nextVal) {
  // 用于通过正则判断该 property 的 key 是否以 on 开头，是则为注册事件，否则为 attribute 或 property
  const isOn = (key: string) => /^on[A-Z]/.test(key);

  // 若为注册事件
  if (isOn(key)) {
    const event = key.slice(2).toLowerCase();
    // 利用 Element.addEventListener() 将方法挂载到元素上
    el.addEventListener(event, nextVal);
  }
  // 否则
  else {
    // 若 props 对象中的 property 为 undefined 或 null
    if (nextVal == null) {
      // 利用 Element.removeAttribute() 将该 property 从元素上移除
      el.removeAttribute(key);
    } else {
      // 利用 Element.setAttribute() 将 property 挂载到元素上
      // 其中 key 作为元素的 attribute 或 property 名，value 作为 attribute 或 property 的值
      el.setAttribute(key, nextVal);
    }
  }
}

// 用于将元素添加到根容器/父元素中
function insert(el, parent, anchor = null) {
  // 利用 Element.append() 将元素添加到根容器/父元素中
  parent.insertBefore(el, anchor);
}

// 用于创建文本节点
function createText(text) {
  // 利用 document.createTextNode() 创建文本节点
  return document.createTextNode(text);
}

// 用于移除元素
function remove(child) {
  // 获取当前元素的父元素
  const parent = child.parentNode;

  if (parent) {
    // 利用 Element.removeChild() 将元素从其父元素中移除
    parent.removeChild(child);
  }
}

// 用于修改元素的文本内容
function setElementText(el, text) {
  el.textContent = text;
}

// 调用 createRenderer 函数，并传入包含 createText 函数、createElement 函数、patchProp 函数和 insert 函数的对象
const renderer: any = createRenderer({
  createElement,
  patchProp,
  insert,
  createText,
  remove,
  setElementText,
});

// 用于创建应用实例
function createApp(...args) {
  // 调用 createRenderer 函数返回对象的 createApp 方法
  return renderer.createApp(...args);
}

export { createApp };
export * from '../runtime-core/index';
