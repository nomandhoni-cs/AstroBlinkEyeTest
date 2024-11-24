import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DDmuHUGp.mjs';
import { manifest } from './manifest_DWLo9w7D.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/activate-license.astro.mjs');
const _page2 = () => import('./pages/api/activatelicense.astro.mjs');
const _page3 = () => import('./pages/hello.astro.mjs');
const _page4 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/activate-license.ts", _page1],
    ["src/pages/api/activatelicense.ts", _page2],
    ["src/pages/hello.ts", _page3],
    ["src/pages/index.astro", _page4]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "98f2cc60-4555-4f99-8ccc-24bde4a5bcf2",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
