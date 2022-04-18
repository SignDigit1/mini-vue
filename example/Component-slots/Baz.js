/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-18 16:40:10
 * @LastEditTime: 2022-04-18 16:43:03
 * @FilePath: /mini-vue3/example/Component-slots/Baz.js
 */
import { h } from '../../lib/mini-vue3.esm.js';
export const Baz = {
  name: 'Baz',
  setup() {
    return {};
  },
  render() {
    const msg = 'this is a slot';

    // 通过在调用 renderSlots 函数时传入第三个参数指定传入插槽函数的参数
    return h('div', {}, [
      this.$slots.content({
        msg,
      }),
    ]);
  },
};
