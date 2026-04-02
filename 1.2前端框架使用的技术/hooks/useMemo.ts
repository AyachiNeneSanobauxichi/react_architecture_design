import useEffect from "./useEffect";
import useState from "./useState";

// useMemo
const useMemo = <T>(callback: () => T) => {
  const [value, setValue] = useState<T>(callback());
  useEffect(() => setValue(callback()));

  return value;
};

export default useMemo;
