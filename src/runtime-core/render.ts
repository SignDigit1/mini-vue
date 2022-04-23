/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-08 16:04:11
 * @LastEditTime: 2022-04-24 01:50:17
 * @FilePath: \mini-vue3\src\runtime-core\render.ts
 */

import { createComponentInstance, setupComponent } from './component';
import { createAppAPI } from './createApp';
import { ShapeFlags } from './ShapeFlags';
import { Fragment, Text, VNode } from './vnode';

function createRenderer(options) {
  // 通过解构赋值获取 createElement 函数、patchProp 函数和 insert 函数
  const {
    createText: hostCreateText,
    createElement: hostCreateElement,
    patchProp: hostPatchProp,
    insert: hostInsert,
  } = options;

  // 用于处理组件对应的 VNode
  function patch(vnode: VNode, container, parentComponent) {
    // 根据 VNode 类型的不同调用不同的函数
    // 通过 VNode shapeFlag property 与枚举变量 ShapeFlags 进行与运算来判断 VNode 类型
    // 根据 Element 对应 VNode 的 type property 创建 DOM 元素并同时赋值给变量 el 和 VNode 的 el property
    const { type, shapeFlag } = vnode;

    // 通过 VNode 的 type property 判断 VNode 类型是 Fragment 或其他
    switch (type) {
      case Fragment:
        processFragment(vnode, container, parentComponent);
        break;

      case Text:
        processText(vnode, container);
        break;

      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(vnode, container, parentComponent);
        }
        // 若 type property 的类型是 object，则 VNode 类型是 Component
        else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(vnode, container, parentComponent);
        }
        break;
    }
  }

  // 用于处理 Fragment
  function processFragment(vnode: VNode, container, parentComponent) {
    mountChildren(vnode.children, container, parentComponent);
  }

  // 用于处理 Text
  function processText(vnode: VNode, container) {
    // 通过解构赋值获取 Text 对应 VNode 的 children，即文本内容
    const { children } = vnode;
    // 利用 document.createTextNode() 创建文本节点
    const textNode = hostCreateText(children as string);
    // 利用 Element.append() 将该节点添加到根容器/其父元素中
    hostInsert(textNode, container);
  }

  // 用于处理 Element
  function processElement(vnode, container, parentComponent) {
    mountElement(vnode, container, parentComponent);
  }

  // 用于处理 Component
  function processComponent(vnode: VNode, container, parentComponent) {
    mountComponent(vnode, container, parentComponent);
  }


  // 用于进行 Element 的初始化
  function mountElement(vnode, container, parentComponent) {
    // 根据 Element 对应 VNode 的 type property 创建 DOM 元素并赋值给变量 el
    const el = (vnode.el = hostCreateElement(vnode.type));

    // 通过解构赋值获取 Element 对应 VNode 的 props property 和 children property
    const { props, children, shapeFlag } = vnode;

    // 遍历 props，利用 Element.setAttribute() 将其中的 property 添加到 el 上
    // 其中 key 作为 el 的 attribute 或 property 名，value 作为 attribute 或 property 的值

    for (const key in props) {
      const val = props[key];
      // patchProp 函数
      hostPatchProp(el, key, val);
    }

    // 通过 VNode shapeFlag property 与枚举变量 ShapeFlags 进行与运算来判断 children 类型
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children;
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(children, el, parentComponent);
    }

    // 利用 Element.append() 将 el 添加到根容器/其父元素中
    hostInsert(el, container);
  }

  // 用于遍历 children，对其中每个 VNode 调用 patch 方法进行处理
  function mountChildren(children, container, parentComponent) {
    children.forEach(child => {
      patch(child, container, parentComponent);
    });
  }

  // 用于进行 Component 的初始化
  function mountComponent(vnode: VNode, container, parentComponent) {
    // 通过组件对应的 VNode 创建组件实例对象，用于挂载 props、slots 等
    const instance = createComponentInstance(vnode, parentComponent);
    setupComponent(instance);
    setupRenderEffect(instance, vnode, container);
  }

  function setupRenderEffect(instance, vnode, container) {
    // 通过解构赋值获取组件实例对象的 proxy property
    const { proxy } = instance;
    // 调用组件实例对象中 render 函数获取 VNode 树
    const subTree = instance.render.call(proxy);

    patch(subTree, container, instance);

    // 将 VNode 树的 el property 赋值给 VNode 的 el property
    vnode.el = subTree.el;
  }

  function render(vnode: VNode, container) {
    patch(vnode, container, null);
  }

  return {
    createApp: createAppAPI(render),
  };
}

export { createRenderer };
