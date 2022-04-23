/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-24 01:08:35
 * @LastEditTime: 2022-04-24 01:21:30
 * @FilePath: \mini-vue3\src\runtime-core\apiInject.ts
 */

import { getCurrentInstance } from './component';

/**
 * 用于注入依赖
 * @param key
 * @param value
 */
function provide(key, value) {
  const currentInstance: any = getCurrentInstance();
  if (currentInstance) {
    let { provides } = currentInstance;
    // 获取父组件实例对象的 provides property
    const parentProvides = currentInstance.parent.provides;

    // 若判断当前组件实例对象和父组件实例对象的 provides property 相等，则是在当前组件 setup 中第一次调用 provide 函数
    if (provides === parentProvides) {
      // 利用 Object.create() 创建一个以父组件实例对象的 provides property 为原型的空对象，将其赋值给当前组件实例对象的 provides property
      provides = currentInstance.provides = Object.create(parentProvides);
    }

    // 将依赖挂载到当前组件实例对象的 provides property 上
    provides[key] = value;
  }
}

/**
 * 用于引入依赖
 * @param key
 * @param defaultValue
 */
function inject(key, defaultValue) {
  const currentInstance: any = getCurrentInstance();
  if (currentInstance) {
    // 通过解构赋值获取当前组件实例对象的 parent property，即其父组件实例对象
    const { parent } = currentInstance;
    // 获取父组件实例对象的 parent property
    const parentProvides = parent.provides;

    // 若父组件实例对象的 provides property 上有相应的 property 则直接返回
    if (key in parentProvides) {
      return parentProvides[key];
    } else if (defaultValue) {
      if (typeof defaultValue === 'function') {
        return defaultValue();
      }
      return defaultValue;
    }
  }
}

export { provide, inject };
