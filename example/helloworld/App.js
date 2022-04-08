/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-08 15:31:56
 * @LastEditTime: 2022-04-08 15:31:56
 * @FilePath: /mini-vue3/example/helloworld/App.js
 */
export const App = {
  // render 函数
  render() {
    // 在 render 函数中通过 this 获取 setup 返回对象的 property
    return h('div', {}, 'hello, ' + this.name);
  },
  // composition API
  setup() {
    // 返回一个对象
    return {
      name: 'mini-vue3',
    };
  },
};
