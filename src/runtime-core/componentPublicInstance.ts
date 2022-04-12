/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-11 18:10:10
 * @LastEditTime: 2022-04-12 23:35:49
 * @FilePath: \mini-vue3\src\runtime-core\componentPublicInstance.ts
 */

import { hasOwn } from '../shared/index';

// 用于保存组件实例对象 property 及对应的 getter
const publicPropertiesMap = {
  $el: i => i.vnode.el,
};

const PublicInstanceHandlers = {
  get({ _: instance }, key) {
    const { setupState, props } = instance;

    if (hasOwn(setupState, key)) {
      return setupState[key];
    } else if (hasOwn(props, key)) {
      return props[key];
    }

    // 若获取指定 property 则调用对应 getter 并返回其返回值
    const publicGetter = publicPropertiesMap[key];

    if (publicGetter) {
      return publicGetter(instance);
    }
  },
};

export { PublicInstanceHandlers };
