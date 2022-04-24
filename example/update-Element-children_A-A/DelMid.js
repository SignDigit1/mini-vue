/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-24 21:19:29
 * @LastEditTime: 2022-04-24 21:19:30
 * @FilePath: \mini-vue3\example\update-Element-children_A-A\DelMid.js
 */
import { h, ref } from '../../lib/mini-vue3.esm.js';

const prev = [
  h('span', { key: 'A' }, 'A'),
  h('span', { key: 'B' }, 'B'),
  h('span', { key: 'C', class: 'deleted' }, 'C'),
  h('span', { key: 'D', class: 'deleted' }, 'D'),
  h('span', { key: 'E' }, 'E'),
  h('span', { key: 'F' }, 'F'),
];

const next = [
  h('span', { key: 'A' }, 'A'),
  h('span', { key: 'B' }, 'B'),
  h('span', { key: 'E' }, 'E'),
  h('span', { key: 'F' }, 'F'),
];

export default {
  name: 'DelMid',
  setup() {
    const isDelMid = ref(false);
    window.isDelMid = isDelMid;

    return {
      isDelMid,
    };
  },
  render() {
    const self = this;

    return h('div', {}, self.isDelMid ? next : prev);
  },
};
