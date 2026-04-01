import { useEffect, useState } from "./hooks/index";

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

(() => {
  // useStateDemo();
  useEffectDemo();
})();
