import ReactReconciler from "react-reconciler";

// type HostConfig
// 宿主环境配置项
const hostConfig = {
  // 是否支持直接修改节点（mutation 模式），设为 true 表示用 DOM-like 的增删改
  supportsMutation: true,

  // 返回根容器的上下文（如命名空间、环境信息），传给子节点
  getRootHostContext() {},
  // 根据父节点上下文，返回子节点的上下文（比如 svg 内部需要不同处理）
  getChildHostContext() {},

  // commit 阶段开始前调用，可以保存一些状态（返回值会传给 resetAfterCommit）
  prepareForCommit() {},
  // commit 阶段结束后调用，可以做清理或触发更新
  resetAfterCommit() {},

  // 判断该节点的子节点是否只是纯文本（返回 true 则不会递归处理子节点）
  shouldSetTextContent(_: any, props: any) {
    return (
      typeof props.children === "string" || typeof props.children === "number"
    );
  },
  // 创建一个元素节点（对应 DOM 的 createElement）
  createInstance(
    type: string,
    newProps: any,
    rootcontainerInstance: any,
    _currentHostContext: any,
    workInProgress: any,
  ) {
    const domElement = document.createElement(type);
    Object.keys(newProps).forEach((propName) => {
      const propValue = newProps[propName];
      if (propName === "children") {
        if (typeof propValue === "string" || typeof propValue === "number") {
          domElement.textContent = propValue.toString();
        }
      } else if (propName === "onClick") {
        domElement.addEventListener("click", propValue);
      } else if (propName === "className") {
        domElement.setAttribute("class", propValue);
      } else {
        domElement.setAttribute(propName, propValue);
      }
    });
    return domElement;
  },
  // 创建一个文本节点（对应 DOM 的 createTextNode）
  createTextInstance(text: string) {
    return document.createTextNode(text);
  },

  // 把子节点追加到父节点（首次渲染时在内存中构建树）
  appendInitialChild(parent: HTMLElement, child: HTMLElement) {
    parent.appendChild(child);
  },
  // 节点创建完成后的初始化（如 autofocus），返回 true 表示需要 commitMount
  finalizeInitialChildren() {},
  // 清空根容器的内容（重新渲染时清除旧内容）
  clearContainer() {},

  // 把子节点追加到父节点（更新时使用）
  appendChild() {},
  // 把子节点追加到根容器
  appendChildToContainer() {},
  // 对比新旧 props，返回需要更新的 payload（返回 null 表示不需要更新）
  prepareUpdate() {},
  // 根据 prepareUpdate 返回的 payload，真正执行节点属性更新
  commitUpdate(
    domElement: HTMLElement,
    updatePayload: any,
    type: string,
    oldProps: any,
    newProps: any,
  ) {
    Object.keys(newProps).forEach((propName) => {
      const propValue = newProps[propName];
      if (propName === "children") {
        if (typeof propValue === "string" || typeof propValue === "number") {
          domElement.textContent = propValue.toString();
        }
      } else {
        domElement.setAttribute(propName, propValue);
      }
    });
  },
  // 更新文本节点的内容
  commitTextUpdate(textinstance: any, oldText: string, newText: string) {
    textinstance.text = newText;
  },
  // 从父节点中移除子节点
  removeChild(parent: HTMLElement, child: HTMLElement) {
    parent.removeChild(child);
  },
} as any;

// 初始化 ReactReconciler
const reactReconciler = ReactReconciler(hostConfig);

// react dom
const reactDom = {
  render: (
    reactElement: React.ReactElement,
    domElement: HTMLElement & { _reactRootContainer: React.ReactElement },
    callback: () => void,
  ) => {
    // 创建根节点
    if (!domElement._reactRootContainer) {
      domElement._reactRootContainer = reactReconciler.createContainer(
        domElement,
        0,
        false,
        null,
      );
    }

    reactReconciler.updateContainer(
      reactElement,
      domElement._reactRootContainer,
      null,
      callback,
    );
  },
};

export default reactDom;
