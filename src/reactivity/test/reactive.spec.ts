/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-03-21 14:33:26
 * @LastEditTime: 2022-03-21 14:44:22
 * @FilePath: /mini-vue3/src/reactivity/test/reactive.spec.ts
 */
import { reactive } from '../reactive';
describe('reactivity/reactive', () => {
  it('Object', () => {
    const original = { foo: 1 };
    const observed = reactive(original);
    expect(observed).not.toBe(original);
    expect(observed.foo).toBe(1);
  });
});
