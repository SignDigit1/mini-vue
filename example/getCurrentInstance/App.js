/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-13 23:04:54
 * @LastEditTime: 2022-04-22 00:48:55
 * @FilePath: \mini-vue3\example\getCurrentInstance\App.js
 */
/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-12 09:35:51
 * @LastEditTime: 2022-04-12 09:38:22
 * @FilePath: /mini-vue3/example/Component-props/App.js
 */
import { h, getCurrentInstance } from '../../lib/mini-vue3.esm.js';
import { Foo } from './Foo.js';

const App = {
  name: 'App',
  setup() {
    // 获取当前组件实例对象
    const instance = getCurrentInstance();
    console.log('App:', instance);

    return {};
  },
  render() {
    return h(Foo);
  },
};
export { App };
