self.oninstall=self.skipWaiting;self.onactivate=e=>e.waitUntil(self.clients.claim());self.onfetch=e=>{const s=e.request.url;s.endsWith("esbuild.wasm")&&!s.includes("latest")&&e.respondWith(caches.open("esbuild-repl:v1").then(async l=>{let t=await l.match(e.request);return t||(t=await fetch(e.request),t.ok&&l.put(e.request,t)),t.clone()}))};