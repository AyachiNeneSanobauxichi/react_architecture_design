// useState
const useState = (value: any) => {
  const getter = () => value;
  const setter = (newValue: any) => (value = newValue);

  return [getter, setter] as const;
};

export { useState };
