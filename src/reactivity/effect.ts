/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-03-21 14:49:18
 * @LastEditTime: 2022-03-31 00:13:27
 * @FilePath: \mini-vue3\src\reactivity\effect.ts
 */

/**
 * 用于保存程序运行中的所有依赖
 * key为响应式对象
 * value为该相应对象的所有实例
 */
const targetsMap = new WeakMap();

// 用于保存正在执行的 ReactiveEffect 类的实例
let activeEffect: ReactiveEffect;
class ReactiveEffect {
  private _fn: any;
  constructor(fn) {
    this._fn = fn;
  }
  run() {
    activeEffect = this;
    this._fn();
  }
}

function track(target, key) {
  // 获取当前响应式对象对应的 Map 实例,若为 undefined 则进行初始化并保存到 targetsMap 中
  let depsMap: Map<any, Set<ReactiveEffect>> | undefined =
    targetsMap.get(target);
  if (!depsMap) {
    depsMap = new Map<any, Set<ReactiveEffect>>();
    targetsMap.set(target,depsMap)
  }

  // 获取当前 property 对应的 Set 实例，若为 undefined 则进行初始化并保存到 depsMap 中
  let deps: Set<ReactiveEffect> | undefined = depsMap.get(key);
  if (!deps) {
    deps = new Set<ReactiveEffect>();
    depsMap.set(key, deps);
  }

  // 若 deps 中包括当前正在执行的 ReactiveEffect 类的实例则直接返回
  if (deps.has(activeEffect)) {
    return;
  }
  // 将当前正在执行的 ReactiveEffect 类的实例添加到 deps 中
  deps.add(activeEffect);
}

function trigger(target, key) {
  // 获取当前响应式对象对应的 Map 实例
  const depsMap: Map<any, Set<ReactiveEffect>> = targetsMap.get(target);

  // 获取当前 property 对应的 Set 实例
  const deps: Set<ReactiveEffect> = depsMap.get(key)!;

  for (const reactiveEffect of deps) {
    reactiveEffect.run();
  }
}

function effect(fn) {
  const _effect: ReactiveEffect = new ReactiveEffect(fn);
  _effect.run();
}

export { track, trigger, effect };
