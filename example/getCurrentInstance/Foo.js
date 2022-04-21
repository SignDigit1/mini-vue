/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-12 09:37:54
 * @LastEditTime: 2022-04-22 00:49:06
 * @FilePath: \mini-vue3\example\getCurrentInstance\Foo.js
 */
/* Foo.js */

// Foo 组件选项对象
import { h, getCurrentInstance } from '../../lib/mini-vue3.esm.js';
export const Foo = {
  name: 'Foo',
  setup() {
    // 获取当前组件实例对象
    const instance = getCurrentInstance();
    console.log('Foo:', instance);

    return {};
  },
  render() {
    return h('p', {}, 'Foo component');
  },
};
