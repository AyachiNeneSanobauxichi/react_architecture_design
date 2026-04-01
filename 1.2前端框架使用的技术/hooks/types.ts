type Effect = {
  execute: () => void;
  deps: Set<Set<Effect>>;
};
