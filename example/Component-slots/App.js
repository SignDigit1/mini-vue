/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-13 23:04:54
 * @LastEditTime: 2022-04-18 17:21:27
 * @FilePath: /mini-vue3/example/Component-slots/App.js
 */
/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-12 09:35:51
 * @LastEditTime: 2022-04-12 09:38:22
 * @FilePath: /mini-vue3/example/Component-props/App.js
 */
import { h, createTextVNode } from '../../lib/mini-vue3.esm.js';
import { Foo } from './Foo.js';
import { Bar } from './Bar.js';
import { Baz } from './Baz.js';
const App = {
  name: 'App',
  setup() {
    return {};
  },
  render() {
    // 传入一个 VNode 作为插槽

    return h('div', {}, [
      'app',
      h(Foo, {}, { default: h('p', {}, 'a slot') }),
      h(
        Bar,
        {},
        {
          header: h('p', {}, 'header slot'),
          footer: h('p', {}, 'footer slot'),
        }
      ),
      h(
        Baz,
        {},
        {
          content: props => [
            h('p', {}, 'content: ' + props.msg),
            createTextVNode('a text node'),
          ],
        }
      ),
    ]);

    // 传入一个 VNode 数组，数组中每一项为一个插槽
    // return h(Foo, {}, [h('p', {}, 'a slot'), h('p', {}, 'another slot')])
  },
};

export { App };
