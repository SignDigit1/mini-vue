/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-13 23:15:34
 * @LastEditTime: 2022-04-14 00:31:23
 * @FilePath: \mini-vue3\src\runtime-core\componentSlots.ts
 */
// 用于将 children 赋值给组件实例对象的 slots property
function initSlots(instance, children) {
  const slots = {};
  // 遍历 children，将其 property 对应的 VNode 数组挂载到 slots 对象上
  for (const key in children) {
    const value = children[key];

    slots[key] = Array.isArray(value) ? value : [value];
  }

  instance.slots = slots;
}

export { initSlots };
