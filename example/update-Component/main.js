/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-26 01:59:00
 * @LastEditTime: 2022-04-26 01:59:01
 * @FilePath: \mini-vue3\example\update-Component\main.js
 */
import { createApp } from '../../lib/mini-vue3.esm.js';
import { App } from './App.js';

const rootContainer = document.querySelector('#app');
const app = createApp(App);
app.mount(rootContainer);
