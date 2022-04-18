/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-13 23:15:34
 * @LastEditTime: 2022-04-18 14:59:48
 * @FilePath: /mini-vue3/src/runtime-core/componentSlots.ts
 */
// 用于将 children 赋值给组件实例对象的 slots property
function initSlots(instance, children) {
  // 具名导入
  instance.slots = Array.isArray(children) ? children : [children];
}

export { initSlots };
