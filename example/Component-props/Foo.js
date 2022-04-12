/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-12 09:37:54
 * @LastEditTime: 2022-04-12 09:37:55
 * @FilePath: /mini-vue3/example/Component-props/Foo.js
 */
/* Foo.js */

// Foo 组件选项对象
export const Foo = {
  // props 对象是 setup 的第一个参数
  setup(props) {
    console.log(props);

    // props 对象是只读的，但不是深度只读的
    props.count++;
    console.log(props.count);
  },
  render() {
    // 在 render 函数中通过 this 获取 props 对象的 property
    return h('div', {}, 'foo: ' + this.count);
  },
};
