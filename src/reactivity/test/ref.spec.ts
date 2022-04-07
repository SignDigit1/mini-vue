/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-06 10:32:28
 * @LastEditTime: 2022-04-07 15:51:21
 * @FilePath: /mini-vue3/src/reactivity/test/ref.spec.ts
 */
import { effect } from '../effect';
import { ref } from '../ref';

describe('reactivity/ref', () => {
  it('should hold a value', () => {
    // 创建 ref 对象
    const a = ref(1);
    // ref 对象的 value property 的值等于传入的值
    expect(a.value).toBe(1);
    // ref 对象的 value property 的值是可变的
    a.value = 2;
    expect(a.value).toBe(2);
  });

  it('should be reactive', () => {
    const a = ref(1);
    let dummy;
    let calls = 0;
    effect(() => {
      calls++;
      dummy = a.value;
    });
    expect(calls).toBe(1);
    expect(dummy).toBe(1);
    // ref 对象是响应式的
    a.value = 2;
    expect(calls).toBe(2);
    expect(dummy).toBe(2);
    // ref 对象的 value property 的 set 具有缓存，不会重复触发依赖
    a.value = 2;
    expect(calls).toBe(2);
    expect(dummy).toBe(2);
  });
});
