import { c as cleanupOutdatedCaches, p as precacheAndRoute, r as registerRoute, S as StaleWhileRevalidate, E as ExpirationPlugin, C as CacheFirst } from "./assets/vendor.c6976955.js";
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
precheAndRoute(assetsToCache);
registerRoute(/\.(?:js|css/, new StaleWhileRevalidate(////  cacheNa: "jsAndStyles",
  plugs: [
    new ExpiraonPlugin({
      maxEntries: 1e3////    maxeSecos: DAY_IN_SECONDS
    })
  ]
}));
registerRout/\.(?:png|gif|jpg|jpeg|g)$/, new CacFirst({
  cacheName: "iges",
  plugins: [
    new ExpirationPlugin({
      xEntries: 1e3,
      maxAgeconds:ONTHN_SECONDS,
      purgeOnQuotaError: true
    })
  ]
}));
//# sourceMappingURL=index.988eeb62.js.map
