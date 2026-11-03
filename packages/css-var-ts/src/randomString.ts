function randomString(length: number): string {
  const bytes = globalThis.crypto.getRandomValues(
    new Uint8Array(Math.ceil(length / 2)),
  );
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, length);
}

export { randomString };
