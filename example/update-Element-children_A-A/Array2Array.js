/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-24 21:18:44
 * @LastEditTime: 2022-04-24 21:18:45
 * @FilePath: \mini-vue3\example\update-Element-children_A-A\Array2Array.js
 */
import { h, ref } from '../../lib/mini-vue3.esm.js';

const prev = [
  h('span', { key: 'A' }, 'A'),
  h('span', { key: 'B' }, 'B'),
  h('span', { key: 'C', class: 'deleted' }, 'C'),
  h('span', { key: 'D' }, 'D'),
  h('span', { key: 'E' }, 'E'),
  h('span', { key: 'F' }, 'F'),
  h('span', { key: 'G' }, 'G'),
];

const next = [
  h('span', { key: 'A' }, 'A'),
  h('span', { key: 'B' }, 'B'),
  h('span', { key: 'E', class: 'moved' }, 'E'),
  h('span', { key: 'D' }, 'D'),
  h('span', { key: 'X', class: 'added' }, 'X'),
  h('span', { key: 'F' }, 'F'),
  h('span', { key: 'G' }, 'G'),
];

export default {
  name: 'Array2Array',
  setup() {
    const isUpdateA2A = ref(false);
    window.isUpdateA2A = isUpdateA2A;

    return {
      isUpdateA2A,
    };
  },
  render() {
    const self = this;

    return h('div', {}, self.isUpdateA2A ? next : prev);
  },
};
