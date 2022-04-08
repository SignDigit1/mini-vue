/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-08 09:44:26
 * @LastEditTime: 2022-04-08 15:22:04
 * @FilePath: /mini-vue3/src/reactivity/computed.ts
 */
import { ReactiveEffect } from './effect';
import { Ref } from './ref';

class ComputedImpl implements Ref {
  private _effect: ReactiveEffect;
  // 用于保存 getter 函数的执行结果
  private _value;
  // 用于记录是否不使用缓存
  private _dirty = true;

  constructor(getter) {
    // 利用 getter 函数创建 ReactiveEffect 类的实例
    this._effect = new ReactiveEffect(
      getter,
      // 用于关闭缓存
      () => {
        this._dirty = true;
      }
    );
  }
  // value property 的 get 返回调用私有 property _effect 的 run 方法的返回值，即调用 getter 函数的返回值
  get value() {
    if (this._dirty) {
      this._value = this._effect.run();
      this._dirty = false;
    }
    return this._value;
  }
}

function computed(getter) {
  // 返回 RefImpl 类的实例，即 ref 对象
  return new ComputedImpl(getter);
}

export { computed };
