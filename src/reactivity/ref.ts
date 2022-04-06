/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-06 10:18:21
 * @LastEditTime: 2022-04-06 10:54:53
 * @FilePath: /mini-vue3/src/reactivity/ref.ts
 */
interface Ref {
  value: any;
}

// Ref 接口的实现类，对操作进行封装
class RefImpl implements Ref {
  private _value;
  constructor(value) {
    this._value = value;
  }
  get value() {
    // TODO 收集依赖
    return this._value;
  }
  set value(newVal) {
    // TODO 触发依赖
    this._value = newVal;
  }
}

export function ref(value): Ref {
  // 返回 RefImpl 类的实例，即 ref 对象
  return new RefImpl(value);
}
