/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-01 10:23:46
 * @LastEditTime: 2022-04-01 14:39:44
 * @FilePath: /mini-vue3/src/reactivity/readonly.ts
 */
import {
  createReactiveObject,
  ReactiveFlags,
  readonlyHandlers,
} from './baseHandlers';
function readonly<T extends Object>(raw: T): T {
  return createReactiveObject(raw, readonlyHandlers);
}

// 用于检查对象是否是由 readonly 创建的 readonly 响应式对象
function isReadonly(value) {
  // 获取对象的某个特殊 property 的值，从而触发 get，property 名为 __v_isReactive
  return !!value[ReactiveFlags.IS_READONLY];
}

export { readonly, isReadonly };
