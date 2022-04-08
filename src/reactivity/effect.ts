/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-03-21 14:49:18
 * @LastEditTime: 2022-04-08 09:44:19
 * @FilePath: /mini-vue3/src/reactivity/effect.ts
 */

/**
 * 用于保存程序运行中的所有依赖
 * key为响应式对象
 * value为该相应对象的所有实例
 */
const targetsMap = new WeakMap();

// 用于记录是否应该收集依赖，防止调用 stop 后触发响应式对象的 property 的 get 时收集依赖
let shouldTrack = false;

// 用于保存正在执行的 ReactiveEffect 类的实例
let activeEffect: ReactiveEffect;
class ReactiveEffect {
  private _fn: any;
  deps: Array<Set<ReactiveEffect>> = [];
  active = true;
  onStop?: Function;
  // 构造函数接受可选的第二个参数，保存为实例的公共变量 scheduler
  constructor(fn, public scheduler?) {
    this._fn = fn;
  }
  run() {
    if (!this.active) {
      return this._fn();
    }
    // 应该收集依赖
    shouldTrack = true;
    // 调用 run 方法时，用全局变量 activeEffect 保存当前实例
    activeEffect = this;

    const res = this._fn();
    // 重置
    shouldTrack = false;

    // 返回传入的函数执行的结果
    return res;
  }

  stop() {
    if (this.active) {
      cleanupEffect(this);

      // 在调用 stop 方法时，调用 onStop 方法
      this.onStop?.();

      this.active = false;
    }
  }
}

/** 将ReactiveEffect实例从依赖数组中删除 */
function cleanupEffect(effect: ReactiveEffect) {
  effect.deps.forEach((dep: Set<ReactiveEffect>) => {
    // TODO：delete删除时进行比较，可能会触发一次依赖收集
    dep.delete(effect);
  });
}

// 用于判断是否应该收集依赖
function isTracking() {
  return shouldTrack && activeEffect !== undefined;
}

// 用于将当前正在执行的 ReactiveEffect 类的实例添加到 dep 中， 同时将 dep 添加到当前正在执行的 ReactiveEffect 类的实例的 deps property 中
function trackEffects(deps) {
  // 若 deps 中包括当前正在执行的 ReactiveEffect 类的实例则直接返回
  if (deps.has(activeEffect)) {
    return;
  }
  // 将当前正在执行的 ReactiveEffect 类的实例添加到 deps 中
  deps.add(activeEffect);

  activeEffect?.deps.push(deps);
}

function track(target, key) {
  if (!isTracking()) {
    return;
  }
  // 获取当前响应式对象对应的 Map 实例,若为 undefined 则进行初始化并保存到 targetsMap 中
  let depsMap: Map<any, Set<ReactiveEffect>> | undefined =
    targetsMap.get(target);
  if (!depsMap) {
    depsMap = new Map<any, Set<ReactiveEffect>>();
    targetsMap.set(target, depsMap);
  }

  // 获取当前 property 对应的 Set 实例，若为 undefined 则进行初始化并保存到 depsMap 中
  let deps: Set<ReactiveEffect> | undefined = depsMap.get(key);
  if (!deps) {
    deps = new Set();
    depsMap.set(key, deps);
  }

  trackEffects(deps);
}

// 用于遍历 dep，调用每一个 ReactiveEffect 类的实例的 scheduler 方法或 run 方法
function triggerEffects(deps) {
  for (const reactiveEffect of deps) {
    if (reactiveEffect.scheduler) {
      reactiveEffect.scheduler();
    } else {
      reactiveEffect.run();
    }
  }
}

function trigger(target, key) {
  // 获取当前响应式对象对应的 Map 实例
  const depsMap: Map<any, Set<ReactiveEffect>> = targetsMap.get(target);

  // 获取当前 property 对应的 Set 实例
  const deps: Set<ReactiveEffect> = depsMap.get(key)!;
  triggerEffects(deps);
}

// 用于停止传入的函数的执行
function stop(runner) {
  runner.effect.stop();
}

interface EffectOptions {
  scheduler?: Function;
  onStop?: Function;
}

function effect(fn, options: EffectOptions = {}) {
  const _effect: ReactiveEffect = new ReactiveEffect(fn, options.scheduler);
  Object.assign(_effect, options);
  _effect.run();
  const runner: any = _effect.run.bind(_effect);
  // 将 _effect 赋值给 runner 的 effect property
  runner.effect = _effect;
  return runner;
}

export {
  track,
  trigger,
  effect,
  stop,
  isTracking,
  trackEffects,
  triggerEffects,
  ReactiveEffect
};
