/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-24 21:20:01
 * @LastEditTime: 2022-04-24 21:20:01
 * @FilePath: \mini-vue3\example\update-Element-children_A-A\MoveMid.js
 */
import { h, ref } from '../../lib/mini-vue3.esm.js';

const prev = [
  h('span', { key: 'A' }, 'A'),
  h('span', { key: 'B' }, 'B'),
  h('span', { key: 'C' }, 'C'),
  h('span', { key: 'D' }, 'D'),
  h('span', { key: 'E' }, 'E'),
  h('span', { key: 'F' }, 'F'),
];

const next = [
  h('span', { key: 'A' }, 'A'),
  h('span', { key: 'D', class: 'moved' }, 'D'),
  h('span', { key: 'B' }, 'B'),
  h('span', { key: 'E', class: 'moved' }, 'E'),
  h('span', { key: 'C' }, 'C'),
  h('span', { key: 'F' }, 'F'),
];

export default {
  name: 'MoveMid',
  setup() {
    const isMoveMid = ref(false);
    window.isMoveMid = isMoveMid;

    return {
      isMoveMid,
    };
  },
  render() {
    const self = this;

    return h('div', {}, self.isMoveMid ? next : prev);
  },
};
