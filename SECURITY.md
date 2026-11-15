# Security Policy

## Supported versions

| Version | Supported |
| --- | --- |
| 1.x | Yes |

## About this library's security surface

`src/stylish-name.js` is a pure text-transformation library: it makes no
network requests, reads no files, stores nothing, and never uses
`eval` or `innerHTML`. The demo in `index.html` renders results with
`textContent` only, so generated names cannot inject markup.

## Reporting a vulnerability

If you find a security problem (for example a way to break out of the
demo page's rendering, or a prototype-pollution path through the API),
please do **not** open a public issue. Contact the maintainer via
https://www.stylishname.click/ with the details and a minimal reproduction.
You will get a reply, and a fix or a documented decision, as fast as a
solo maintainer reasonably can.
