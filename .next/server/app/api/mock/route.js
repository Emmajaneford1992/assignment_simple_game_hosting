const CHUNK_PUBLIC_PATH = "server/app/api/mock/route.js";
const runtime = require("../../../chunks/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/node_modules_next_b0b694._.js");
runtime.loadChunk("server/chunks/[root of the server]__1e74e4._.js");
runtime.loadChunk("server/chunks/_a529ec._.js");
runtime.getOrInstantiateRuntimeModule("[project]/.next-internal/server/app/api/mock/route/actions.js [app-rsc] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/app-route.js { INNER_APP_ROUTE => \"[project]/src/app/api/mock/route.ts [app-route] (ecmascript)\" } [app-route] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
