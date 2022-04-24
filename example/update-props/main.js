/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-08 15:31:50
 * @LastEditTime: 2022-04-24 17:07:12
 * @FilePath: \mini-vue3\example\ready-to-update\main.js
 */
import { App } from './App.js';
import { createApp } from '../../lib/mini-vue3.esm.js';

const rootContainer = document.querySelector('#app');

const app = createApp(App);
app.mount(rootContainer);
