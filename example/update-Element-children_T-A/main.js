/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-24 20:58:35
 * @LastEditTime: 2022-04-24 20:58:36
 * @FilePath: \mini-vue3\example\update-Element-children_T-A\main.js
 */
import { createApp } from '../../lib/mini-vue3.esm.js';
import { App } from './App.js';

const rootContainer = document.querySelector('#app');
const app = createApp(App);
app.mount(rootContainer);
