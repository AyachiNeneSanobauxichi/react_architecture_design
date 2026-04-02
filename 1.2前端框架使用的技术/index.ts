import { useEffect, useMemo, useState } from "./hooks/index";

// useState demo
const useStateDemo = () => {
  const [count, setCount] = useState(0);

  console.log("useState: ", count());
  setCount(1);
  console.log("useState: ", count());
};
void useStateDemo;

// useEffect demo
const useEffectDemo = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("useEffect: ", count());
  });

  setCount(1);
};
void useEffectDemo;

// useMemo demo
const useMemoDemo = () => {
  const [count, setCount] = useState(1);
  const memoizedValue = useMemo(() => count() * 2);
  console.log("useMemo: ", memoizedValue());
  setCount(2);
  console.log("useMemo: ", memoizedValue());
};
void useMemoDemo;

(() => {
  // useStateDemo();
  // useEffectDemo();
  useMemoDemo();
})();
