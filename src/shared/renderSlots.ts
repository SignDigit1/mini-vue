import { createVNode, Fragment } from '../runtime-core/vnode';

/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-14 00:11:32
 * @LastEditTime: 2022-04-18 17:18:46
 * @FilePath: /mini-vue3/src/shared/renderSlots.ts
 */
function renderSlots(slots, name = 'default') {
  console.log(`渲染插槽 slot -> ${name}`);
  // 通过 name 获取相应的插槽
  const slot = slots[name];
  return createVNode(Fragment, {}, slot);
}

export { renderSlots };
