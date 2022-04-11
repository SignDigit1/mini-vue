import { render } from './render';
import { createVNode } from './vnode';

/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-08 15:33:42
 * @LastEditTime: 2022-04-11 10:35:12
 * @FilePath: /mini-vue3/src/runtime-core/createApp.ts
 */
function createApp(rootComponent) {
  return {
    component() {},
    directive() {},
    use() {},
    // mount() {},

    // 用于将应用挂载到根容器中
    mount(rootContainer) {
      // 将根组件转换为 VNode
      const vnode = createVNode(rootComponent);

      render(vnode, rootContainer);
    },
  };
}

export { createApp };
