export interface NotificationItem {
  id: string;
  type: "error" | "warning";
  message: string;
  timestamp: number;
}

type BadgeListener = (count: number, items: NotificationItem[]) => void;

let count = 0;
const listeners = new Set<BadgeListener>();
const items: NotificationItem[] = [];
let nextId = 0;

const emit = () => {
  const value = count;
  listeners.forEach((l) => l(value, [...items]));
};

const addError = (message: string) => {
  const item: NotificationItem = {
    id: `err-${nextId++}`,
    type: "error",
    message,
    timestamp: Date.now(),
  };
  items.push(item);
  count = items.length;
  emit();
};

const addWarning = (message: string) => {
  const item: NotificationItem = {
    id: `warn-${nextId++}`,
    type: "warning",
    message,
    timestamp: Date.now(),
  };
  items.push(item);
  count = items.length;
  emit();
};

const clear = () => {
  count = 0;
  items.length = 0;
  emit();
};

const removeItem = (id: string) => {
  const idx = items.findIndex((item) => item.id === id);
  if (idx >= 0) {
    items.splice(idx, 1);
    count = items.length;
    emit();
  }
};

const getCount = () => count;

const getItems = () => [...items];

const addListener = (cb: BadgeListener) => {
  listeners.add(cb);
  cb(count, [...items]);
};

const removeListener = (cb: BadgeListener) => {
  listeners.delete(cb);
};

export default {
  addError,
  addWarning,
  clear,
  removeItem,
  getCount,
  getItems,
  addListener,
  removeListener,
};
