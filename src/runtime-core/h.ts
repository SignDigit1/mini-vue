/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-08 16:03:15
 * @LastEditTime: 2022-04-08 16:03:16
 * @FilePath: /mini-vue3/src/runtime-core/h.ts
 */
import { createVNode } from './vnode';

function h(type, props?, children?) {
  return createVNode(type, props, children);
}
export { h };
