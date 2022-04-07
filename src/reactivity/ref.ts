import { isTracking, trackEffects, triggerEffects } from './effect';

/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-06 10:18:21
 * @LastEditTime: 2022-04-07 15:50:35
 * @FilePath: /mini-vue3/src/reactivity/ref.ts
 */
interface Ref {
  value: any;
}

// Ref 接口的实现类，对操作进行封装
class RefImpl implements Ref {
  private _value;
  private deps;
  constructor(value) {
    this._value = value;
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
    if (newVal === this._value) {
      return;
    }

    this._value = newVal;
    //  触发依赖
    triggerEffects(this.deps);
  }
}

export function ref(value): Ref {
  // 返回 RefImpl 类的实例，即 ref 对象
  return new RefImpl(value);
}
