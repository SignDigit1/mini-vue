/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-11 10:01:52
 * @LastEditTime: 2022-04-11 18:13:54
 * @FilePath: /mini-vue3/src/runtime-core/component.ts
 */
import { PublicInstanceHandlers } from './componentPublicInstance';
import { patch } from './render';
import { VNode } from './vnode';

interface Component {
  vnode: VNode;
  type: string | object | Function;
  setupState: Object;
}

function createComponentInstance(vnode: VNode): Component {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
  };
  return component;
}

// 用于初始化 props、初始化 slots 和调用 setup 方法以及设置 render 函数
function setupComponent(instance) {
  // TODO: 调用 initProps
  // TODO: 调用 initSlots

  setupStatefulComponent(instance);
}

// 用于初始化有状态的组件（相对的是没有状态的函数式组件）
function setupStatefulComponent(instance) {
  // 通过组件实例对象的 type property 获取组件选项对象
  const Component = instance.type;

  // 利用 Proxy 对组件实例对象的 proxy property 的 get 进行代理
  instance.proxy = new Proxy({ _: instance }, PublicInstanceHandlers);

  // 通过解构赋值获取组件选项对象中的 setup 方法
  const { setup } = Component;

  // 若组件选项对象中包含 setup 方法则调用该方法并处理其返回值
  if (setup) {
    const setupResult = setup();
    // 处理 setup 方法的返回值
    handleSetupResult(instance, setupResult);
  }
}

// 用于处理 setup 方法的返回值
function handleSetupResult(instance, setupResult) {
  // 根据 setup 方法返回值类型的不同进行不同的处理
  // 若返回一个 object 则将其注入到组件的上下文中
  if (typeof setupResult === 'object') {
    instance.setupState = setupResult;
  }
  // 若返回一个 function 则将其作为组件的 render 函数
  else if (typeof setupResult === 'function') {
    // TODO: 处理 function
  }

  finishComponentSetup(instance);
}

// 用于设置 render 函数
function finishComponentSetup(instance) {
  // 通过组件实例对象的 type property 获取组件选项对象
  const Component = instance.type;

  // 若组件选项对象中包含 render 函数则将其赋值给组件实例对象的 render 方法
  if (Component.render) {
    instance.render = Component.render;
  }
}

function setupRenderEffect(instance, vnode, container) {
  // 通过解构赋值获取组件实例对象的 proxy property
  const { proxy } = instance;
  // 调用组件实例对象中 render 函数获取 VNode 树
  const subTree = instance.render.call(proxy);

  patch(subTree, container);

  // 将 VNode 树的 el property 赋值给 VNode 的 el property
  vnode.el = subTree.el;
}

export { createComponentInstance, setupComponent, setupRenderEffect };
