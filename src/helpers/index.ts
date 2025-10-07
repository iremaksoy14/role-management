export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const genId = () =>
globalThis.crypto && "randomUUID" in globalThis.crypto
  ? globalThis.crypto.randomUUID()
  : `u-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;