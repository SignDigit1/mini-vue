/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-08 16:04:11
 * @LastEditTime: 2022-04-24 21:13:29
 * @FilePath: \mini-vue3\src\runtime-core\render.ts
 */

import { effect } from '../reactivity/index';
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
    remove: hostRemove,
    setElementText: hostSetElementText,
  } = options;

  // 用于处理组件对应的 VNode
  function patch(
    preVnode: VNode | null,
    newVnode: VNode,
    container,
    parentComponent
  ) {
    // 根据 VNode 类型的不同调用不同的函数
    // 通过 VNode shapeFlag property 与枚举变量 ShapeFlags 进行与运算来判断 VNode 类型
    // 根据 Element 对应 VNode 的 type property 创建 DOM 元素并同时赋值给变量 el 和 VNode 的 el property
    const { type, shapeFlag } = newVnode;

    // 通过 VNode 的 type property 判断 VNode 类型是 Fragment 或其他
    switch (type) {
      case Fragment:
        processFragment(preVnode, newVnode, container, parentComponent);
        break;

      case Text:
        processText(preVnode, newVnode, container);
        break;

      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(preVnode, newVnode, container, parentComponent);
        }
        // 若 type property 的类型是 object，则 VNode 类型是 Component
        else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(preVnode, newVnode, container, parentComponent);
        }
        break;
    }
  }

  // 用于处理 Fragment
  function processFragment(
    preVnode: VNode | null,
    newVnode: VNode,
    container,
    parentComponent
  ) {
    mountChildren(newVnode.children, container, parentComponent);
  }

  // 用于处理 Text
  function processText(preVnode: VNode | null, newVnode: VNode, container) {
    // 通过解构赋值获取 Text 对应 VNode 的 children，即文本内容
    const { children } = newVnode;
    // 利用 document.createTextNode() 创建文本节点
    const textNode = hostCreateText(children as string);
    // 利用 Element.append() 将该节点添加到根容器/其父元素中
    hostInsert(textNode, container);
  }

  // 用于处理 Element
  function processElement(
    preVnode: VNode | null,
    newVnode: VNode,
    container,
    parentComponent
  ) {
    if (!preVnode) {
      // 若旧 VNode 不存在则进行新 Element 的初始化
      mountElement(newVnode, container, parentComponent);
    } else {
      // 否则进行 Element 的更新
      patchElement(preVnode, newVnode, container, parentComponent);
    }
  }

  // 用于处理 Component
  function processComponent(
    preVnode: VNode | null,
    newVnode: VNode,
    container,
    parentComponent
  ) {
    mountComponent(newVnode, container, parentComponent);
  }

  // 用于进行 Element 的初始化
  function mountElement(vnode, container, parentComponent) {
    // 根据 Element 对应 VNode 的 type property 创建 DOM 元素并赋值给变量 el
    const el = (vnode.el = hostCreateElement(vnode.type));

    // 通过解构赋值获取 Element 对应 VNode 的 props property 和 children
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

  function patchElement(
    preVNode: VNode,
    newVNode: VNode,
    container,
    parentComponent
  ) {
    // TODO: 实现 patchElement 函数
    const oldProps = preVNode.props || {};
    const newProps = newVNode.props || {};

    // 将旧 VNode 的 el property 挂载到新 VNode 上
    const el = (newVNode.el = preVNode.el);

    patchChildren(preVNode, newVNode, el, parentComponent);
    patchProps(el, oldProps, newProps);
  }

  function patchChildren(preVnode, newVnode, container, parentComponent) {
    // 通过结构赋值分别获得新旧 VNode 的 children 和 shapeFlag property
    const { children: c1, shapeFlag: prevShapeFlag } = preVnode;
    const { children: c2, shapeFlag: nextShapeFlag } = newVnode;

    // 若新 VNode 的 children 类型为 string
    if (nextShapeFlag & ShapeFlags.TEXT_CHILDREN) {
      // 同时旧 VNode 的 children 类型为 Array
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // 移除旧 VNode 的 children
        unmountChildren(c1);
      }

      // 若新旧 VNode 的 children 不同
      if (c1 !== c2) {
        // 将根容器/父元素的文本内容设置为新 VNode 的 children
        hostSetElementText(container, c2);
      }
    } // 若新 VNode 的 children 类型为 Array
    else if (nextShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // 同时旧 VNode 的 children 类型为 string
      if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
        // 将根容器/父元素的文本内容设置为空字符串
        hostSetElementText(container, '');

        // 将新 VNode 的 children 添加到根容器/父元素中
        mountChildren(c2, container, parentComponent);
      }
      // 同时旧 VNode 的 children 类型为 Array
      else {
        // TODO: Array2Array
      }
    }
  }

  // 用于遍历 children，移除其中的所有 VNode
  function unmountChildren(children) {
    for (const child of children) {
      // 移除 VNode
      hostRemove(child);
    }
  }

  function patchProps(el, oldProps, newProps) {
    if (oldProps !== newProps) {
      // 遍历新 VNode 的 props 对象
      for (const key in newProps) {
        const prev = oldProps[key];
        const next = newProps[key];

        // 若新旧 VNode 的 props 对象中的 property 或方法不相等
        if (prev !== next) {
          // 将新 VNode 的 property 或方法挂载到元素上
          hostPatchProp(el, key, next);
        }

        if (oldProps !== {}) {
          // 遍历旧 VNode 的 props 对象
          for (const key in oldProps) {
            // 若新 VNode 的 props 对象中不包含该 property 或方法
            if (!(key in newProps)) {
              // 将元素上该 property 或方法赋值为 null
              hostPatchProp(el, key, null);
            }
          }
        }
      }
    }
  }

  // 用于遍历 children，对其中每个 VNode 调用 patch 方法进行处理
  function mountChildren(children, container, parentComponent) {
    children.forEach(child => {
      patch(null, child, container, parentComponent);
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
    // 利用 effect 将调用 render 函数和 patch 方法的操作收集
    effect(() => {
      // 根据组件实例对象的 isMounted property 判断是初始化或更新 VNode 树
      // 若为 false 则是初始化
      if (!instance.isMounted) {
        // 通过解构赋值获取组件实例对象的 proxy property
        const { proxy } = instance;
        // 调用组件实例对象中 render 函数获取 VNode 树
        const subTree = (instance.subTree = instance.render.call(proxy));

        patch(null, subTree, container, instance);

        // 将 VNode 树的 el property 赋值给 VNode 的 el property
        vnode.el = subTree.el;

        instance.isMounted = true;
      } else {
        // 通过解构赋值获取组件实例对象的 proxy property 和旧 VNode 树
        const { proxy, subTree: preSubTree } = instance;

        // 调用组件实例对象中 render 函数获取新 VNode 树，同时将 this 指向指定为 proxy property
        const subTree = (instance.subTree = instance.render.call(proxy));

        // 调用 patch 方法处理新旧 VNode 树
        patch(preSubTree, subTree, container, instance);
      }
    });
  }

  function render(vnode: VNode, container) {
    patch(null, vnode, container, null);
  }

  return {
    createApp: createAppAPI(render),
  };
}

export { createRenderer };
