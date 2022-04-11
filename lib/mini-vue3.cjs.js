'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-11 10:01:52
 * @LastEditTime: 2022-04-11 17:47:14
 * @FilePath: /mini-vue3/src/runtime-core/component.ts
 */
function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
        setupState: {},
    };
    return component;
}
// 用于初始化 props、初始化 slots 和调用 setup 方法以及设置 render 函数
function setupComponent(instance) {
    // TODO: 调用 initProps
    // TODO: 调用 initSlots
    setupStatefulComponent(instance);
}
// 用于初始化有状态的组件（相对的是没有状态的函数式组件）
function setupStatefulComponent(instance) {
    // 通过组件实例对象的 type property 获取组件选项对象
    const Component = instance.type;
    // 利用 Proxy 对组件实例对象的 proxy property 的 get 进行代理
    instance.proxy = new Proxy({}, {
        get(target, key) {
            // 通过解构赋值获取组件实例对象的 setupState property
            const { setupState } = instance;
            // 若组件实例对象的 setupState property 上有该 property 则返回其值
            if (key in setupState) {
                return setupState[key];
            }
            // 若获取 $el property 则返回 VNode 的 el property
            if (key === '$el') {
                return instance.vnode.el;
            }
        },
    });
    // 通过解构赋值获取组件选项对象中的 setup 方法
    const { setup } = Component;
    // 若组件选项对象中包含 setup 方法则调用该方法并处理其返回值
    if (setup) {
        const setupResult = setup();
        // 处理 setup 方法的返回值
        handleSetupResult(instance, setupResult);
    }
}
// 用于处理 setup 方法的返回值
function handleSetupResult(instance, setupResult) {
    // 根据 setup 方法返回值类型的不同进行不同的处理
    // 若返回一个 object 则将其注入到组件的上下文中
    if (typeof setupResult === 'object') {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
// 用于设置 render 函数
function finishComponentSetup(instance) {
    // 通过组件实例对象的 type property 获取组件选项对象
    const Component = instance.type;
    // 若组件选项对象中包含 render 函数则将其赋值给组件实例对象的 render 方法
    if (Component.render) {
        instance.render = Component.render;
    }
}
function setupRenderEffect(instance, vnode, container) {
    // 通过解构赋值获取组件实例对象的 proxy property
    const { proxy } = instance;
    // 调用组件实例对象中 render 函数获取 VNode 树
    const subTree = instance.render.call(proxy);
    patch(subTree, container);
    // 将 VNode 树的 el property 赋值给 VNode 的 el property
    vnode.el = subTree.el;
}

/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-08 16:04:11
 * @LastEditTime: 2022-04-11 16:47:05
 * @FilePath: /mini-vue3/src/runtime-core/render.ts
 */
// 用于处理组件对应的 VNode
function patch(vnode, container) {
    // 根据 VNode 类型的不同调用不同的函数
    // 通过 VNode 的 type property 的类型来判断 VNode 类型
    // 根据 Element 对应 VNode 的 type property 创建 DOM 元素并同时赋值给变量 el 和 VNode 的 el property
    if (typeof vnode.type === 'string') {
        processElement(vnode, container);
    }
    // 若 type property 的类型是 object，则 VNode 类型是 Component
    else if (typeof vnode.type === 'object') {
        processComponent(vnode, container);
    }
}
// 用于处理 Element
function processElement(vnode, container) {
    mountElement(vnode, container);
}
// 用于处理 Component
function processComponent(vnode, container) {
    mountComponent(vnode, container);
}
// 用于进行 Element 的初始化
function mountElement(vnode, container) {
    // 根据 Element 对应 VNode 的 type property 创建 DOM 元素并赋值给变量 el
    const el = (vnode.el = document.createElement(vnode.type));
    // 通过解构赋值获取 Element 对应 VNode 的 props property 和 children property
    const { props, children } = vnode;
    // 遍历 props，利用 Element.setAttribute() 将其中的 property 添加到 el 上
    // 其中 key 作为 el 的 attribute 或 property 名，value 作为 attribute 或 property 的值
    for (const key in props) {
        const val = props[key];
        el.setAttribute(key, val);
    }
    // 若 children 的类型是 string，则将其赋值给 el 的 textContent property
    if (typeof children === 'string') {
        el.textContent = children;
    }
    // 若 children 的类型是 Array，则调用 mountChildren 函数
    else if (Array.isArray(children)) {
        mountChildren(children, el);
    }
    // 利用 Element.append() 将 el 添加到根容器/其父元素中
    container.append(el);
}
// 用于遍历 children，对其中每个 VNode 调用 patch 方法进行处理
function mountChildren(children, container) {
    children.forEach(child => {
        patch(child, container);
    });
}
// 用于进行 Component 的初始化
function mountComponent(vnode, container) {
    // 通过组件对应的 VNode 创建组件实例对象，用于挂载 props、slots 等
    const instance = createComponentInstance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance, vnode, container);
}
function render(vnode, container) {
    patch(vnode, container);
}

function createVNode(type, props, children) {
    const vnode = {
        // HTML 标签名、组件
        type,
        // 保存 attribute、prop 和事件的对象
        props,
        // 对应组件的根元素
        children,
    };
    return vnode;
}

/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-08 15:33:42
 * @LastEditTime: 2022-04-11 10:35:12
 * @FilePath: /mini-vue3/src/runtime-core/createApp.ts
 */
function createApp(rootComponent) {
    return {
        component() { },
        directive() { },
        use() { },
        // mount() {},
        // 用于将应用挂载到根容器中
        mount(rootContainer) {
            // 将根组件转换为 VNode
            const vnode = createVNode(rootComponent);
            render(vnode, rootContainer);
        },
    };
}

/*
 * @Author: jun.fu<fujunchn@qq.com>
 * @LastEditors: jun.fu<fujunchn@qq.com>
 * @Description: file content
 * @Date: 2022-04-08 16:03:15
 * @LastEditTime: 2022-04-08 16:03:16
 * @FilePath: /mini-vue3/src/runtime-core/h.ts
 */
function h(type, props, children) {
    return createVNode(type, props, children);
}

exports.createApp = createApp;
exports.h = h;
