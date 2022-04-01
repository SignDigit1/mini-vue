/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-01 10:14:00
 * @LastEditTime: 2022-04-01 10:24:29
 * @FilePath: /mini-vue3/src/reactivity/test/readonly.spec.ts
 */
import { readonly } from '../readonly';
describe('reactivity/readonly', () => {
  it('should make values readonly', () => {
    const original = { foo: 1 };
    // 创建 readonly 响应式对象

    const wrapped = readonly(original);
    console.warn = jest.fn();

    // readonly 响应式对象与原始对象不相等
    expect(wrapped).not.toBe(original);
    expect(wrapped.foo).toBe(1);
    // readonly 响应式对象的 property 是只读的
    wrapped.foo = 2;
    expect(wrapped.foo).toBe(1);
    // 修改 readonly 响应式对象的 property 的值时会调用 console.warn 发出警告
    expect(console.warn).toBeCalled();
  });
});
