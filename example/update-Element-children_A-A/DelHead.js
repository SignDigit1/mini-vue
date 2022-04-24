/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-24 21:19:16
 * @LastEditTime: 2022-04-24 21:19:17
 * @FilePath: \mini-vue3\example\update-Element-children_A-A\DelHead.js
 */
import { h, ref } from '../../lib/mini-vue3.esm.js';

const prev = [
  h('span', { key: 'A', class: 'deleted' }, 'A'),
  h('span', { key: 'B', class: 'deleted' }, 'B'),
  h('span', { key: 'C' }, 'C'),
  h('span', { key: 'D' }, 'D'),
  h('span', { key: 'E' }, 'E'),
];

const next = [
  h('span', { key: 'C' }, 'C'),
  h('span', { key: 'D' }, 'D'),
  h('span', { key: 'E' }, 'E'),
];

export default {
  name: 'DelHead',
  setup() {
    const isDelHead = ref(false);
    window.isDelHead = isDelHead;

    return {
      isDelHead,
    };
  },
  render() {
    const self = this;

    return h('div', {}, self.isDelHead ? next : prev);
  },
};
