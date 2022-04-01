/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-03-21 14:35:45
 * @LastEditTime: 2022-04-01 11:00:21
 * @FilePath: /mini-vue3/src/reactivity/reactive.ts
 */
import { createReactiveObject, mutableHandlers } from './baseHandlers';
export function reactive(raw: any) {
  return createReactiveObject(raw, mutableHandlers);
}
