/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-24 20:57:38
 * @LastEditTime: 2022-04-24 20:57:39
 * @FilePath: \mini-vue3\example\update-Element-children_T-A\Text2Text.js
 */
import { h, ref } from '../../lib/mini-vue3.esm.js';

const prev = 'prevChild';
const next = 'nextChild';

export default {
  name: 'Text2Text',
  setup() {
    const isUpdateT2T = ref(false);
    window.isUpdateT2T = isUpdateT2T;

    return {
      isUpdateT2T,
    };
  },
  render() {
    const self = this;

    return h('div', {}, self.isUpdateT2T ? next : prev);
  },
};
