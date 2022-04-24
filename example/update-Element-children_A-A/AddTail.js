/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-24 21:18:03
 * @LastEditTime: 2022-04-24 21:18:04
 * @FilePath: \mini-vue3\example\update-Element-children_A-A\AddTail.js
 */
import { h, ref } from '../../lib/mini-vue3.esm.js';

const prev = [
  h('span', { key: 'A' }, 'A'),
  h('span', { key: 'B' }, 'B'),
  h('span', { key: 'C' }, 'C'),
];

const next = [
  h('span', { key: 'A' }, 'A'),
  h('span', { key: 'B' }, 'B'),
  h('span', { key: 'C' }, 'C'),
  h('span', { key: 'X', class: 'added' }, 'X'),
  h('span', { key: 'Y', class: 'added' }, 'Y'),
];

export default {
  name: 'AddTail',
  setup() {
    const isAddTail = ref(false);
    window.isAddTail = isAddTail;

    return {
      isAddTail,
    };
  },
  render() {
    const self = this;

    return h('div', {}, self.isAddTail ? next : prev);
  },
};
