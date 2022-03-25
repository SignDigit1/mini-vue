/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-03-21 14:35:45
 * @LastEditTime: 2022-03-21 14:37:50
 * @FilePath: /mini-vue3/src/reactivity/reactive.ts
 */
export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      // TODO: 依赖收集
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      // TODO: 触发依赖
      return Reflect.set(target, key, value);
    },
  });
}
