/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-24 21:20:30
 * @LastEditTime: 2022-04-24 21:20:31
 * @FilePath: \mini-vue3\example\update-Element-children_A-A\main.js
 */
import { createApp } from '../../lib/mini-vue3.esm.js';
import { App } from './App.js';

const rootContainer = document.querySelector('#app');
const app = createApp(App);
app.mount(rootContainer);
