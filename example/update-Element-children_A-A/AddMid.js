/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-24 21:17:27
 * @LastEditTime: 2022-04-24 21:17:28
 * @FilePath: \mini-vue3\example\update-Element-children_A-A\AddMid.js
 */
import { h, ref } from '../../lib/mini-vue3.esm.js';

const prev = [
  h('span', { key: 'A' }, 'A'),
  h('span', { key: 'B' }, 'B'),
  h('span', { key: 'C' }, 'C'),
  h('span', { key: 'D' }, 'D'),
];

const next = [
  h('span', { key: 'A' }, 'A'),
  h('span', { key: 'B' }, 'B'),
  h('span', { key: 'X', class: 'added' }, 'X'),
  h('span', { key: 'Y', class: 'added' }, 'Y'),
  h('span', { key: 'C' }, 'C'),
  h('span', { key: 'D' }, 'D'),
];

export default {
  name: 'AddMid',
  setup() {
    const isAddMid = ref(false);
    window.isAddMid = isAddMid;

    return {
      isAddMid,
    };
  },
  render() {
    const self = this;

    return h('div', {}, self.isAddMid ? next : prev);
  },
};
