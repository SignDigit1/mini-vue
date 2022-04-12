/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-13 00:09:21
 * @LastEditTime: 2022-04-13 00:15:32
 * @FilePath: \mini-vue3\src\runtime-core\componentEmit.ts
 */
import { toHandlerKey, camelize } from '../shared/index';

function emit(this: any, event, ...args) {
  const { props } = this;
  const handlerName = toHandlerKey(camelize(event));
  const handler = props[handlerName];
  handler && handler(...args);
}
export { emit };
