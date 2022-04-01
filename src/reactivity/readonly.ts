/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-01 10:23:46
 * @LastEditTime: 2022-04-01 10:59:13
 * @FilePath: /mini-vue3/src/reactivity/readonly.ts
 */
import { createReactiveObject, readonlyHandlers } from './baseHandlers';
function readonly<T extends Object>(raw: T): T {
  return createReactiveObject(raw, readonlyHandlers);
}

export { readonly };
