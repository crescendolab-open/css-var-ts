---
"@crescendolab/css-var-ts": patch
---

Remove the `randombytes` dependency so the package loads in browsers without a `Buffer` polyfill.

`randomString` now uses `globalThis.crypto.getRandomValues` (Web Crypto). It still returns lowercase hex of the requested length. Web Crypto is available in modern browsers and as a global in Node.js 19+; Node.js 18 needs the `--experimental-global-webcrypto` flag.
