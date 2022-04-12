/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-12 09:35:51
 * @LastEditTime: 2022-04-12 09:38:22
 * @FilePath: /mini-vue3/example/Component-props/App.js
 */
import { h } from '../../lib/mini-vue3.esm.js';
import { Foo } from './Foo.js';
const App = {
  render() {
    return h(
      'div',
      {
        id: 'root',
      },
      [
        h('div', {}, 'hello, ' + this.name),
        // 创建 Foo 组件，向其中传入 count prop
        h(Foo, { count: 1 }),
      ]
    );
  },
  setup() {
    return {
      name: 'mini-vue3',
    };
  },
};
export { App };
