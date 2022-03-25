/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-03-21 14:49:18
 * @LastEditTime: 2022-03-21 15:02:12
 * @FilePath: /mini-vue3/src/reactivity/effect.ts
 */

class ReactiveEffect {
  private _fn: any;
  constructor(fn) {
    this._fn = fn;
  }
  run() {
    this._fn();
  }
}

export function effect(fn) {
  const _effect: ReactiveEffect = new ReactiveEffect(fn);
  _effect.run;
}
