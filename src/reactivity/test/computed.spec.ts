/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-08 09:54:36
 * @LastEditTime: 2022-04-08 09:55:40
 * @FilePath: /mini-vue3/src/reactivity/test/computed.spec.ts
 */
import { reactive } from '../reactive';
import { computed } from '../computed';
describe('reactivity/computed', () => {
  it('should return updated value', () => {
    const value = reactive({ foo: 1 });
    // 接受一个 getter 函数创建只读响应式 ref 对象，
    const cValue = computed(() => value.foo);
    expect(cValue.value).toBe(1);
    value.foo = 2;
    expect(cValue.value).toBe(2);
  });
});
