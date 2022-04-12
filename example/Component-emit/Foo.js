/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-12 09:37:54
 * @LastEditTime: 2022-04-12 23:44:14
 * @FilePath: \mini-vue3\example\Component-emit\Foo.js
 */
/* Foo.js */

// Foo 组件选项对象
import { h } from '../../lib/mini-vue3.esm.js';
export const Foo = {
  // props 对象是 setup 的第一个参数
  setup(props, { emit }) {
    console.log(props);

    // props 对象是只读的，但不是深度只读的
    props.count++;
    console.log(props.count);
    const emitBar = () => {
      console.log('emit bar');
      // 通过 emit 触发使用 Foo 组件时在 props 对象中声明的 onBar 方法
      emit('bar', 1, 2);
    };

    const emitBarBaz = () => {
      console.log('emit bar baz');
      // 通过 emit 触发使用 Foo 组件时在 props 对象中声明的 onBarBaz 方法
      emit('bar-baz', 3, 4);
    };

    return {
      emitBar,
      emitBarBaz,
    };
  },
  render() {
    const btnBar = h(
      'button',
      {
        // 在 render 函数中通过 this 获取 setup 返回对象的方法
        onClick: this.emitBar,
      },
      'emitBar'
    );

    const btnBaz = h(
      'button',
      {
        onClick: this.emitBarBaz,
      },
      'emitBarBaz'
    );

    // 在 render 函数中通过 this 获取 props 对象的 property
    return h('div', {}, ['foo: ' + this.count, btnBar, btnBaz]);
  },
};
