/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-06 10:01:06
 * @LastEditTime: 2022-04-06 10:09:45
 * @FilePath: /mini-vue3/src/reactivity/test/shallowReadonly.spec.ts
 */
import { shallowReadonly, isReadonly } from '../readonly';
describe('reactivity/shallowReadonly', () => {
  test('should not make non-reactive properties reactive', () => {
    const props = shallowReadonly({ n: { foo: 1 } });
    expect(isReadonly(props.n)).toBe(false);
  });
});
