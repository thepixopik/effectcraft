// The AllCraft Effect service worker: precaches hashed Wasm chunks & assets for instant repeat loads
// while keeping navigation HTML network-first so Studio splash/UI updates appear immediately.
const VERSION = "__EC_VERSION__";
const FILES = __EC_FILES__;
const CACHE = `effectcraft-${VERSION}`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: "reload" }))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("effectcraft-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return;
  if (url.pathname.endsWith("/effectcraft-config.json")) return;
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE).catch(() => null);
      if (req.mode === "navigate") {
        const key = new URL("./", self.registration.scope).href;
        try {
          const fresh = await fetch(req);
          if (cache && fresh.ok) void cache.put(key, fresh.clone()).catch(() => {});
          return fresh;
        } catch {
          const hit = cache && (await cache.match(key, { ignoreSearch: true }).catch(() => null));
          if (hit) return hit;
          throw new Error("offline");
        }
      }
      if (cache) {
        const hit = await cache.match(req).catch(() => null);
        if (hit) return hit;
      }
      const res = await fetch(req);
      if (cache && res.ok && res.type === "basic") void cache.put(req, res.clone()).catch(() => {});
      return res;
    })(),
  );
});
