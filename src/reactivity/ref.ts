import { isTracking, trackEffects, triggerEffects } from './effect';
import { toReactive } from './reactive';

/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-06 10:18:21
 * @LastEditTime: 2022-04-07 23:46:43
 * @FilePath: \mini-vue3\src\reactivity\ref.ts
 */
interface Ref {
  value: any;
}

// Ref 接口的实现类，对操作进行封装
class RefImpl implements Ref {
  private _rawValue;
  private _value;
  private deps;
  public __v_isRef = true;
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

function ref(value): Ref {
  // 返回 RefImpl 类的实例，即 ref 对象
  return new RefImpl(value);
}

// 用于判断一个值是否是 ref 对象
function isRef(value): boolean {
  return !!value.__v_isRef;
}

// 用于获取 ref 对象的 value property 的值
function unref(ref) {
  return isRef(ref) ? ref.value : ref;
}

function proxyRefs(objectWithRefs) {
  // 返回 Proxy 的实例
  return new Proxy(objectWithRefs, {
    get: function (target, key) {
      // 获取传入的对象的 property 的值，再调用 unref 进行处理
      return unref(Reflect.get(target, key));
    },
    set: function (target, key, value) {
      const oldValue = target[key];
      // 若传入的对象的 property 的值是一个 ref 对象，而 set 的值不是一个 ref 对象，则修改该 ref 对象的值，否则直接修改 property 的值
      if (isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
      return Reflect.set(target, key, value);
    },
  });
}

export { ref, isRef, unref, proxyRefs };
