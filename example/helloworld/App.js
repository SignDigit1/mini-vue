/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-08 15:31:56
 * @LastEditTime: 2022-04-11 23:46:50
 * @FilePath: \mini-vue3\example\helloworld\App.js
 */
import { h } from '../../lib/mini-vue3.esm.js';
export const App = {
  // render 函数
  render() {
    window.self = this;

    // 在 render 函数中通过 this 获取 setup 返回对象的 property
    return h(
      'div',
      {
        id: 'root',
        class: 'root-div',
        // 注册 onClick 事件
        onClick() {
          console.log('you clicked root-div');
        },
        // 注册 onMousedown 事件
        onMousedown() {
          console.log('your mouse down on root-div');
        },
      },
      'hello, ' + this.name
    );
    // return h('div', { id: 'root', class: 'root' }, [
    //   h('p', { id: 'p1', class: 'p1' }, 'hello, mini-vue3'),
    //   h('p', { id: 'p2', class: 'p2' }, 'this is mini-vue3'),
    // ]);
  },
  // composition API
  setup() {
    // 返回一个对象
    return {
      name: 'mini-vue3',
    };
  },
};
