export function createEventBus() {
  const handlers = new Map();

  return {
    on(eventName, handler) {
      if (!handlers.has(eventName)) {
        handlers.set(eventName, new Set());
      }
      handlers.get(eventName).add(handler);

      return () => handlers.get(eventName)?.delete(handler);
    },

    emit(eventName, payload) {
      handlers.get(eventName)?.forEach((handler) => handler(payload));
    },
  };
}
