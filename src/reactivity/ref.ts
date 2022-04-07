import { isTracking, trackEffects, triggerEffects } from './effect';
import { toReactive } from './reactive';

/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-06 10:18:21
 * @LastEditTime: 2022-04-07 16:03:47
 * @FilePath: /mini-vue3/src/reactivity/ref.ts
 */
interface Ref {
  value: any;
}

// Ref 接口的实现类，对操作进行封装
class RefImpl implements Ref {
  private _rawValue;
  private _value;
  private deps;
  constructor(value) {
    // 将传入的值赋值给实例的私有 property _rawValue
    this._rawValue = value;
    // 对传入的值进行处理，将结果赋值给实例的私有 property _value
    this._value = toReactive(value);
    this.deps = new Set();
  }
  get value() {
    // 收集依赖
    if (isTracking()) {
      trackEffects(this.deps);
    }
    return this._value;
  }
  set value(newVal) {
    if (newVal === this._rawValue) {
      return;
    }
    // 将 set 的值赋值给实例的私有 property _rawValue
    this._rawValue = newVal;
    // 对 set 的值进行处理，将结果赋值给实例的私有 property _value
    this._value = toReactive(newVal);
    //  触发依赖
    triggerEffects(this.deps);
  }
}

export function ref(value): Ref {
  // 返回 RefImpl 类的实例，即 ref 对象
  return new RefImpl(value);
}
