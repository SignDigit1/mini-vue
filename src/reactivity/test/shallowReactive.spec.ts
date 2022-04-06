/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-06 10:00:40
 * @LastEditTime: 2022-04-06 10:09:13
 * @FilePath: /mini-vue3/src/reactivity/test/shallowReactive.spec.ts
 */
import { shallowReactive, isReactive } from '../reactive';
describe('shallowReactive', () => {
  test('should not make non-reactive properties reactive', () => {
    const props = shallowReactive({ n: { foo: 1 } });
    expect(isReactive(props.n)).toBe(false);
  });
});
