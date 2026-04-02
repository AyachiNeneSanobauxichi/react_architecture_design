/**
 * 优点：
 * 1. 无需显示指明依赖；
 * 2. 由于可以自动跟踪依赖，因此不受 React Hooks “不能在条件语句中声明 Hooks ” 的限制。
 * 限制：
 * getValue 是一个函数，而不是自变量的值。
 */

export { default as useState } from "./useState";
export { default as useEffect } from "./useEffect";
export { default as useMemo } from "./useMemo";
