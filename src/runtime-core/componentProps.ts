/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-12 23:09:56
 * @LastEditTime: 2022-04-12 23:11:05
 * @FilePath: \mini-vue3\src\runtime-core\componentProps.ts
 */
// 用于将 props 对象挂载到组件实例对象上
function initProps(instance, rawProps = {}) {
  instance.props = rawProps;
}

export { initProps };
