/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-01 10:48:05
 * @LastEditTime: 2022-04-01 10:59:47
 * @FilePath: /mini-vue3/src/reactivity/baseHandlers.ts
 */
import { track, trigger } from './effect';

const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);

// 用于生成 get 函数的工具函数
function createGetter(isReadonly = false) {
  return function (target, key) {
    const res = Reflect.get(target, key);
    // 利用 reactive 进行响应式转换时才进行依赖收集
    if (!isReadonly) {
      track(target, key);
    }
    return res;
  };
}

// 用于生成 set 函数的工具函数
function createSetter() {
  return function (target, key, value) {
    const res = Reflect.set(target, key, value);
    // 触发依赖
    trigger(target, key);
    return res;
  };
}

// reactive 对应的 handlers
export const mutableHandlers = {
  get,
  set,
};

// readonly 对应的 handlers
export const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    // 调用 console.warn 发出警告
    console.warn(
      `Set operation on key "${key}" failed: target is readonly.`,
      target
    );
    return true;
  },
};

export function createReactiveObject<T extends Object>(
  raw: T,
  baseHandlers
): T {
  // 返回 Proxy 的实例
  return new Proxy(raw, baseHandlers);
}
