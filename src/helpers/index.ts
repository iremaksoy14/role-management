export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const genId = () =>
globalThis.crypto && "randomUUID" in globalThis.crypto
  ? globalThis.crypto.randomUUID()
  : `u-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  export const  getInitials=(name: string) =>{
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map((p) => (p[0] ? p[0].toUpperCase() : "")).join("");
  }