/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-06 10:32:28
 * @LastEditTime: 2022-04-07 23:48:01
 * @FilePath: \mini-vue3\src\reactivity\test\ref.spec.ts
 */
import { effect } from '../effect';
import { reactive } from '../reactive';
import { ref, isRef, unref,proxyRefs } from '../ref';

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

  it('should make nested properties reactive', () => {
    const a = ref({
      count: 1,
    });
    let dummy;
    effect(() => {
      dummy = a.value.count;
    });
    expect(dummy).toBe(1);
    // ref 对象的 value property 的是一个响应式对象
    a.value.count = 2;
    expect(dummy).toBe(2);
  });

  it('isRef', () => {
    expect(isRef(ref(1))).toBe(true);
    expect(isRef(reactive({ foo: 1 }))).toBe(false);
    expect(isRef(0)).toBe(false);
    expect(isRef({ bar: 0 })).toBe(false);
  });

  it('unref', () => {
    expect(unref(1)).toBe(1);
    expect(unref(ref(1))).toBe(1);
  });

  describe('reactivity/ref', () => {
    it('proxyRefs', () => {
      const obj = {
        foo: ref(1),
        bar: 'baz'
      }
      const proxyObj = proxyRefs(obj)
      expect(proxyObj.foo).toBe(1)
      expect(proxyObj.bar).toBe('baz')
  
      proxyObj.foo = 2
      expect(proxyObj.foo).toBe(2)
  
      proxyObj.foo = ref(3)
      expect(proxyObj.foo).toBe(3)
    })
  })
  
});
