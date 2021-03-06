/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-24 21:19:44
 * @LastEditTime: 2022-04-24 21:19:45
 * @FilePath: \mini-vue3\example\update-Element-children_A-A\DelTail.js
 */
import { h, ref } from '../../lib/mini-vue3.esm.js';

const prev = [
  h('span', { key: 'A' }, 'A'),
  h('span', { key: 'B' }, 'B'),
  h('span', { key: 'C' }, 'C'),
  h('span', { key: 'D', class: 'deleted' }, 'D'),
  h('span', { key: 'E', class: 'deleted' }, 'E'),
];

const next = [
  h('span', { key: 'A' }, 'A'),
  h('span', { key: 'B' }, 'B'),
  h('span', { key: 'C' }, 'C'),
];

export default {
  name: 'DelTail',
  setup() {
    const isDelTail = ref(false);
    window.isDelTail = isDelTail;

    return {
      isDelTail,
    };
  },
  render() {
    const self = this;

    return h('div', {}, self.isDelTail ? next : prev);
  },
};
