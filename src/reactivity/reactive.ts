/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-03-21 14:35:45
 * @LastEditTime: 2022-03-31 00:15:36
 * @FilePath: \mini-vue3\src\reactivity\reactive.ts
 */
import {track,trigger} from './effect'
export function reactive(raw:any) {
  return new Proxy(raw, {
    get(target, key) {
      track(target,key)
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      const res =  Reflect.set(target, key, value);
      trigger(target,key)
      return res
    },
  });
}
