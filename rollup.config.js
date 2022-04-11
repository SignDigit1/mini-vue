/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-11 10:36:15
 * @LastEditTime: 2022-04-11 10:37:18
 * @FilePath: /mini-vue3/rollup.config.js
 */
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

// 可以直接使用 ESM
export default {
  // 库的入口文件
  input: './src/index.ts',
  // 打包完成后的输出
  output: [
    // CommonJS
    {
      format: 'cjs',
      file: pkg.main,
    },
    // ESM
    {
      format: 'es',
      file: pkg.module,
    },
  ],
  // 配置插件 @rollup/plugin-typescript
  plugins: [typescript()],
};
