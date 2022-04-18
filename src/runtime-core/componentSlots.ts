/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-13 23:15:34
 * @LastEditTime: 2022-04-18 16:44:30
 * @FilePath: /mini-vue3/src/runtime-core/componentSlots.ts
 */
import { ShapeFlags } from './ShapeFlags';
// 用于将 children 赋值给组件实例对象的 slots property
function initSlots(instance, children) {
  const { vnode } = instance;

  if (vnode.shapeFlag & ShapeFlags.SLOTS_CHILDREN) {
    normalizeObjectSlots(children, (instance.slots = {}));
  }
}

function normalizeSlotValue(value) {
  // 把 function 返回的值转换成 array ，这样 slot 就可以支持多个元素了
  return Array.isArray(value) ? value : [value];
}

function normalizeObjectSlots(rawSlots, slots) {
  for (const key in rawSlots) {
    if (Object.prototype.hasOwnProperty.call(rawSlots, key)) {
      const value = rawSlots[key];

      if (typeof value === 'function') {
        // 把这个函数给到slots 对象上存起来
        slots[key] = props => value(props);
      } else {
        slots[key] = value;
      }
    }
  }
}

export { initSlots };
