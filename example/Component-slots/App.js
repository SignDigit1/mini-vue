/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-13 23:04:54
 * @LastEditTime: 2022-04-14 00:16:56
 * @FilePath: \mini-vue3\example\Component-slots\App.js
 */
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
import { Bar } from './Bar.js';
const App = {
  name: 'App',
  setup() {
    return {};
  },
  render() {
    // 传入一个 VNode 作为插槽

    return h('div', {}, [
      'app',
      h(Foo, {}, h('p', {}, 'a slot')),
      h(
        Bar,
        {},
        {
          header: h('p', {}, 'header slot'),
          footer: h('p', {}, 'footer slot'),
        }
      ),
    ]);

    // 传入一个 VNode 数组，数组中每一项为一个插槽
    // return h(Foo, {}, [h('p', {}, 'a slot'), h('p', {}, 'another slot')])
  },
};

export { App };
