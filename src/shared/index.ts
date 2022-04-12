/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-12 23:34:12
 * @LastEditTime: 2022-04-12 23:34:13
 * @FilePath: \mini-vue3\src\shared\index.ts
 */

// 用于判断对象中是否有某个 property
function hasOwn(target, key) {
  return Object.prototype.hasOwnProperty.call(target, key);
}

export { hasOwn };
