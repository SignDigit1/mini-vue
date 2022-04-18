/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-11 23:26:49
 * @LastEditTime: 2022-04-18 15:47:18
 * @FilePath: /mini-vue3/src/runtime-core/ShapeFlags.ts
 */
const enum ShapeFlags {
  // 用于判断 VNode 类型是否是 Element
  ELEMENT = 1, // 00001
  // 用于判断 VNode 类型是否是 Component
  STATEFUL_COMPONENT = 1 << 1, // 00010
  // 用于判断 children 类型是否是 string
  TEXT_CHILDREN = 1 << 2, // 00100
  // 用于判断 children 类型是否是 Array
  ARRAY_CHILDREN = 1 << 3, // 01000
  // vnode 的 children 为 slots 类型
  SLOTS_CHILDREN = 1 << 4, //10000
}

export { ShapeFlags };
