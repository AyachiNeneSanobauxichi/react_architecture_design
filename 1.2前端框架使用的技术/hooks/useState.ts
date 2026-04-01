import effectStack from "./effectStack";

// subscribe
const _subscribe = (effect: Effect, subs: Set<Effect>) => {
  // 订阅
  subs.add(effect);
  // 建立依赖关系
  effect.deps.add(subs);
};

// useState
const useState = <T>(value: T) => {
  // 保存订阅该 state 变化的 effect
  const subs = new Set<Effect>();

  // getter
  const getter = (): T => {
    // 获取当前上下文的 effect
    const effect = effectStack[effectStack.length - 1];
    if (effect) {
      // 建立发布订阅关系
      _subscribe(effect, subs);
    }

    return value;
  };

  // setter
  const setter = (newValue: T) => {
    value = newValue;
    // 通知所有订阅该 state 变化的 effect 执行
    // 拷贝快照再遍历，避免 execute 内 cleanup+重订阅 导致 forEach 死循环
    [...subs].forEach((effect: Effect) => effect.execute());
  };

  return [getter, setter] as const;
};

export default useState;
