/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-13 23:15:34
 * @LastEditTime: 2022-04-18 14:53:11
 * @FilePath: /mini-vue3/src/runtime-core/componentSlots.ts
 */
// 用于将 children 赋值给组件实例对象的 slots property
function initSlots(instance, children) {
  // 具名导入
  if (typeof children === 'object' && !children.type && !children.shapeFlag) {
    const slots = {};
    // 遍历 children，将其 property 对应的 VNode 数组挂载到 slots 对象上
    for (const key in children) {
      const value = children[key];

      slots[key] = value;
    }

    instance.slots = slots;
  } else {
    // 非具名导入
    instance.slots = Array.isArray(children) ? children : [children];
  }
}

export { initSlots };
