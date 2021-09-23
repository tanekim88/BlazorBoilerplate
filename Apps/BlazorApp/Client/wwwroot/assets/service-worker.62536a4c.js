import { c as cleanupOutdatedCaches, p as precacheAndRoute, r as registerRoute, S as StaleWhileRevalidate, E as ExpirationPlugin, C as CacheFirst } from "./vendor.c6976955.js";
const componentName = "Service Worker";
const DEBUG_MODE = location.hostname.endsWith(".app.local") || location.hostname === "localhost";
const DAY_IN_SECONDS = 24 * 60 * 60;
const MONTH_IN_SECONDS = DAY_IN_SECONDS * 30;
const SERVICE_WORKER_VERSION = "1.0.0";
if (DEBUG_MODE) {
  console.debug(`Service worker version ${SERVICE_WORKER_VERSION} loading...`);
}
cleanupOutdatedCaches();
const assetsToCache = self.__WB_MANIFEST || [];
if (DEBUG_MODE) {
  console.trace(`${componentName}:: Assets that will be cached: `, assetsToCache);
}
precacheAndRoute(assetsToCache);
registerRoute(/\.(?:js|css)$/, new StaleWhileRevalidate({
  cacheName: "jsAndStyles",
  plugins: [
    new ExpirationPlugin({
      maxEntries: 1e3,
      maxAgeSeconds: DAY_IN_SECONDS
    })
  ]
}));
registerRoute(/\.(?:png|gif|jpg|jpeg|svg)$/, new CacheFirst({
  cacheName: "images",
  plugins: [
    new ExpirationPlugin({
      maxEntries: 1e3,
      maxAgeSeconds: MONTH_IN_SECONDS,
      purgeOnQuotaError: true
    })
  ]
}));
//# sourceMappingURL=service-worker.62536a4c.js.map
