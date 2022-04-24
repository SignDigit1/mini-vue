/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-24 16:04:41
 * @LastEditTime: 2022-04-24 16:04:41
 * @FilePath: \mini-vue3\example\ready-to-update\App.js
 */
import { ref, h } from '../../lib/mini-vue3.esm.js'

export const App = {
  name: 'App',
  setup() {
    // 响应式数据
    const count = ref(0)

    const onClick = () => {
      // 修改响应式数据
      count.value++
    }

    return {
      count,
      onClick
    }
  },
  render() {
    return h(
      'div',
      {
        id: 'root'
      },
      [
        h('p', {}, `count: ${this.count}`),
        h(
          'button',
          {
            onClick: this.onClick
          },
          'plus 1'
        )
      ]
    )
  }
}