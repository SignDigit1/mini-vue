/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-12 23:34:12
 * @LastEditTime: 2022-04-13 00:07:40
 * @FilePath: \mini-vue3\src\shared\index.ts
 */

// 用于判断对象中是否有某个 property
function hasOwn(target, key) {
  return Object.prototype.hasOwnProperty.call(target, key);
}

// 用于将带连字符的字符串转换为驼峰式
function camelize(str: string) {
  return str.replace(/-(\w)/g, (_, c: string) => {
    return c ? c.toUpperCase() : '';
  });
}

// 用于将字符串首字母转换为大写
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 用于在字符串之前加上 on
function toHandlerKey(str: string) {
  return str ? 'on' + capitalize(str) : '';
}

export { hasOwn, camelize, capitalize, toHandlerKey };
