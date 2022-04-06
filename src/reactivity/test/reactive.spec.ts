/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-03-21 14:33:26
 * @LastEditTime: 2022-04-06 09:44:35
 * @FilePath: /mini-vue3/src/reactivity/test/reactive.spec.ts
 */
import { reactive, isReactive, isProxy } from '../reactive';
describe('reactivity/reactive', () => {
  it('Object', () => {
    const original = { foo: 1 };
    const observed = reactive(original);
    expect(observed).not.toBe(original);

    // 对响应式对象调用 isReactive 返回 true
    expect(isReactive(observed)).toBe(true);
    // 对响应式对象调用 isProxy 返回 true
    expect(isProxy(observed)).toBe(true);
    // 对普通对象调用 isProxy 返回 false
    expect(isProxy(original)).toBe(false);

    expect(observed.foo).toBe(1);
  });

  it('nested reactives', () => {
    const original = { foo: { bar: 1 } };
    const observed = reactive(original);
    // 嵌套对象是响应式的
    expect(isReactive(observed.foo)).toBe(true);
  });
});
