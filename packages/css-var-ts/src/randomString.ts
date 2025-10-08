import randombytes from "randombytes";

function randomString(length: number): string {
  return randombytes(length).toString("hex").slice(0, length);
}

export { randomString };
