/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-24 20:57:20
 * @LastEditTime: 2022-04-24 20:57:21
 * @FilePath: \mini-vue3\example\update-Element-children_T-A\Text2Array.js
 */
import { h, ref } from '../../lib/mini-vue3.esm.js';

const prev = 'prevChild';
const next = [h('div', {}, 'nextChild1'), h('div', {}, 'nextChild2')];

export default {
  name: 'Text2Array',
  setup() {
    const isUpdateT2A = ref(false);
    window.isUpdateT2A = isUpdateT2A;

    return {
      isUpdateT2A,
    };
  },
  render() {
    const self = this;

    return h('div', {}, self.isUpdateT2A ? next : prev);
  },
};
