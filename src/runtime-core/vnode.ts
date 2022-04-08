/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-08 15:53:33
 * @LastEditTime: 2022-04-08 16:01:43
 * @FilePath: /mini-vue3/src/runtime-core/vnode.ts
 */
interface VNode {
  /* HTML 标签名、组件、异步组件或函数式组件。使用返回 null 的函数将渲染一个注释。此参数是必需的。 */
  type: string | object | Function;
  /* 一个对象，与我们将在模板中使用的 attribute、prop 和事件相对应。可选。 */
  props: object;
  /* 子代 VNode，使用 h 生成，或者使用字符串来获取“文本 VNode”，或带有插槽的对象。可选。 */
  children: string | Array<VNode> | object;
}

function createVNode(type, props?, children?): VNode {
  const vnode = {
    // HTML 标签名、组件
    type,
    // 保存 attribute、prop 和事件的对象
    props,
    // 对应组件的根元素
    children,
  };

  return vnode;
}

export { VNode, createVNode };
