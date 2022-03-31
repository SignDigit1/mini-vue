import { effect } from '../effect';
import { reactive } from '../reactive';

/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-03-21 14:49:01
 * @LastEditTime: 2022-03-31 15:44:12
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

  it('should return a function to be called manually', () => {
    let foo = 0;
    // 用一个变量 runner 接受 effect 执行返回的函数
    const runner = effect(() => {
      foo++;
      return 'foo';
    });
    expect(foo).toBe(1);
    // 调用 runner 时会再次执行传入的函数
    const res = runner();
    expect(foo).toBe(2);
    // runner 执行返回该函数的返回值
    expect(res).toBe('foo');
  });

  it('scheduler', () => {
    let dummy;
    let run: number;
    // 创建 mock 函数
    const scheduler = jest.fn(() => {
      run++;
    });
    const obj = reactive({ foo: 1 });
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      { scheduler }
    );
    // 程序运行时会首先执行传入的函数，而不会调用 scheduler 方法
    expect(scheduler).not.toHaveBeenCalled();
    expect(dummy).toBe(1);
    // 当传入的函数依赖的响应式对象的 property 的值更新时，会调用 scheduler 方法而不会执行传入的函数
    obj.foo++;
    expect(scheduler).toHaveBeenCalledTimes(1);
    expect(dummy).toBe(1);
    // 只有当调用 runner 时才会执行传入的函数
    runner();
    expect(scheduler).toHaveBeenCalledTimes(1);
    expect(dummy).toBe(2);
  });
});
