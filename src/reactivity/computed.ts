import { ReactiveEffect } from './effect';
import { Ref } from './ref';

/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-08 09:44:26
 * @LastEditTime: 2022-04-08 09:57:54
 * @FilePath: /mini-vue3/src/reactivity/computed.ts
 */
class ComputedImpl implements Ref {
  private _effect: ReactiveEffect;

  constructor(getter) {
    // 利用 getter 函数创建 ReactiveEffect 类的实例
    this._effect = new ReactiveEffect(getter);
  }
  // value property 的 get 返回调用私有 property _effect 的 run 方法的返回值，即调用 getter 函数的返回值
  get value() {
    return this._effect.run();
  }
}

function computed(getter) {
  // 返回 RefImpl 类的实例，即 ref 对象
  return new ComputedImpl(getter);
}

export { computed };
