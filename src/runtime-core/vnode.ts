import { ShapeFlags } from './ShapeFlags';

/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-08 15:53:33
 * @LastEditTime: 2022-04-18 15:49:36
 * @FilePath: /mini-vue3/src/runtime-core/vnode.ts
 */
interface VNode {
  /* HTML 标签名、组件、异步组件或函数式组件。使用返回 null 的函数将渲染一个注释。此参数是必需的。 */
  type: string | object | Function;
  /* 一个对象，与我们将在模板中使用的 attribute、prop 和事件相对应。可选。 */
  props: object;
  /* 子代 VNode，使用 h 生成，或者使用字符串来获取“文本 VNode”，或带有插槽的对象。可选。 */
  children: string | Array<VNode> | object;
  el?: Element;
  shapeFlag: number;
}

// 用于根据 VNode 的 type property 设置 shapeFlag 对应的位
function getShapeFlag(type) {
  return typeof type === 'string'
    ? ShapeFlags.ELEMENT
    : ShapeFlags.STATEFUL_COMPONENT;
}

function createVNode(type, props?, children?): VNode {
  const vnode = {
    // HTML 标签名、组件
    type,
    // 保存 attribute、prop 和事件的对象
    props,
    // 对应组件的根元素
    children,
    shapeFlag: getShapeFlag(type),
  };

  // 根据 children 的类型设置 shapeFlag 对应的位
  if (typeof children === 'string') {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN;
  } else if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN;
  }

  // 若 VNode 类型为 Component 同时 children 类型为对象，则 children 为插槽，设置 shapeFlag 对应的位
  if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    if (typeof children === 'object') {
      vnode.shapeFlag |= ShapeFlags.SLOTS_CHILDREN;
    }
  }

  return vnode;
}

export { VNode, createVNode };
