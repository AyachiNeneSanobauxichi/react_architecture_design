import useEffect from "./useEffect";
import useState from "./useState";

// useMemo
const useMemo = <T>(callback: () => T) => {
  // 这个 state 是为了缓存 useEffect 每次执行 callback 的结果
  const [value, setValue] = useState<T>(callback());
  // 这里是与 callback 中的 state 建立依赖关系
  useEffect(() => setValue(callback()));

  return value;
};

export default useMemo;
