import effectStack from "./effectStack";

// cleanup
const _cleanup = (effect: Effect) => {
  // 从该 effect 订阅的所有 state 对应 subs 中移除该 effect
  effect.deps.forEach((subs: Set<Effect>) => {
    subs.delete(effect);
  });
  // 将该 effect 所有的 state 对应订阅移除
  effect.deps.clear();
};

// useEffect
const useEffect = (callback: () => void) => {
  // exectue
  const execute = () => {
    // 重置依赖
    _cleanup(effect);
    // 将当前 effect 推入栈顶
    effectStack.push(effect);

    try {
      // 执行回调
      callback();
    } finally {
      // 将当前 effect 从栈顶弹出
      effectStack.pop();
    }
  };

  // effect
  const effect: Effect = {
    execute,
    deps: new Set(),
  };

  // 立刻执行一次 收集依赖关系
  execute();
};

export default useEffect;
