import { effect } from '../effect';
import { reactive } from '../reactive';

/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-03-21 14:49:01
 * @LastEditTime: 2022-03-21 14:53:50
 * @FilePath: /mini-vue3/src/reactivity/test/effect.test.ts
 */
describe('effect', () => {
  it('should run the passed function once (wrapped by a effect)', () => {
    const fnspy = jest.fn(() => {});
    effect(fnspy);
    // 当程序执行时，传入的函数会被执行
    expect(fnspy).toHaveBeenCalledTimes(1);
  });

  it('should observe basic properties', () => {
    let dummy;

    const counter = reactive({ num: 0 });
    // 在传入的函数中使用了响应式对象的 property
    effect(() => (dummy = counter.num));
    expect(dummy).toBe(0);
    // 当该 property 的值更新时，会再次执行该函数
    counter.num = 7;
    expect(dummy).toBe(7);
  });
});
