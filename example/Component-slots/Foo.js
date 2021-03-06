/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-12 09:37:54
 * @LastEditTime: 2022-04-18 17:14:30
 * @FilePath: /mini-vue3/example/Component-slots/Foo.js
 */
/* Foo.js */

// Foo 组件选项对象
import { h, renderSlots } from '../../lib/mini-vue3.esm.js';
export const Foo = {
  name: 'Foo',
  setup() {
    return {};
  },
  render() {
    // 通过 this.$slots 获取父组件传递的插槽
    return h('div', {}, [
      h('p', {}, 'Foo component'),
      h('div', {}, renderSlots(this.$slots)),
    ]);
  },
};
