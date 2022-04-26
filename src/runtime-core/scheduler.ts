/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-26 23:25:55
 * @LastEditTime: 2022-04-26 23:33:13
 * @FilePath: \mini-vue3\src\runtime-core\scheduler.ts
 */
// 用于保存组件实例对象的 update 方法
const queue: any[] = [];

const p = Promise.resolve();

// 用于标志是否将清空队列的操作放到微任务队列中
let isFlushPending = false;

export function nextTick(fn) {
  return fn ? p.then(fn) : p;
}

// 用于将组件实例对象的 update 方法保存到队列中并将清空队列的操作放到微任务队列中
export function queueJobs(job) {
  if (!queue.find(job)) {
    queue.push(job);
  }

  queueFlush();
}

// 用于清空队列
function queueFlush() {
  if (isFlushPending) {
    return;
  }

  isFlushPending = true;

  // 利用 nextTick 将 flushJobs 函数放到微任务队列中
  nextTick(flushJobs);
}

// 用于依次从队列中弹出组件实例对象的 update 方法并执行
function flushJobs() {
  isFlushPending = false;

  let job;
  while ((job = queue.shift())) {
    job && job();
  }
}
