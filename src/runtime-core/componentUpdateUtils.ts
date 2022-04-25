/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-26 02:03:36
 * @LastEditTime: 2022-04-26 02:03:37
 * @FilePath: \mini-vue3\src\runtime-core\componentUpdateUtils.ts
 */
function shouldUpdateComponent(prevVNode, nextVNode): boolean {
  const { props: prevProps } = prevVNode;
  const { props: nextProps } = nextVNode;

  // 对比新旧 VNode 的 props 对象，若不相等则返回 true，否则返回 false
  for (const key in nextProps) {
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }

  return false;
}

export { shouldUpdateComponent };
