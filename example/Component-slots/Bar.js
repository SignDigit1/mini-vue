/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-14 00:12:50
 * @LastEditTime: 2022-04-14 00:26:19
 * @FilePath: \mini-vue3\example\Component-slots\Bar.js
 */
import { renderSlots, h } from '../../lib/mini-vue3.esm.js';
export const Bar = {
  name: 'Bar',
  setup() {
    return {};
  },
  render() {
    return h('div', {}, [
      // 通过在调用 renderSlots 时传入第二个参数指定在此位置渲染的插槽
      renderSlots(this.$slots, 'header'),
      h('p', {}, 'bar component'),
      renderSlots(this.$slots, 'footer'),
    ]);
  },
};
