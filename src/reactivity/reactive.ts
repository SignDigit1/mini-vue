/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-03-21 14:35:45
 * @LastEditTime: 2022-04-07 16:01:46
 * @FilePath: /mini-vue3/src/reactivity/reactive.ts
 */
import {
  createReactiveObject,
  isObject,
  mutableHandlers,
  ReactiveFlags,
  shallowHandlers,
} from './baseHandlers';
import { isReadonly } from './readonly';
function reactive(raw: any) {
  return createReactiveObject(raw, mutableHandlers);
}

function shallowReactive(raw) {
  return createReactiveObject(raw, shallowHandlers);
}

// 用于检查对象是否是由 reactive 创建的响应式对象
function isReactive(value) {
  // 获取对象的某个特殊 property 的值，从而触发 get，property 名为 __v_isReactive
  return !!value[ReactiveFlags.IS_REACTIVE];
}

function toReactive(value) {
  if (isObject(value)) {
    return reactive(value);
  }
  return value;
}

function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}

export { reactive, isReactive, isProxy, shallowReactive, toReactive };
