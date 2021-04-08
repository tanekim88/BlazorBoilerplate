"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workbox_expiration_1 = require("workbox-expiration");
const workbox_precaching_1 = require("workbox-precaching");
const workbox_routing_1 = require("workbox-routing");
const workbox_strategies_1 = require("workbox-strategies");
const componentName = 'Service Worker';
const DEBUG_MODE = location.hostname.endsWith('.app.local') || location.hostname === 'localhost';
const DAY_IN_SECONDS = 24 * 60 * 60;
const MONTH_IN_SECONDS = DAY_IN_SECONDS * 30;
const YEAR_IN_SECONDS = DAY_IN_SECONDS * 365;
const SERVICE_WORKER_VERSION = '1.0.0';
if (DEBUG_MODE) {
    console.debug(`Service worker version ${SERVICE_WORKER_VERSION} loading...`);
}
workbox_precaching_1.cleanupOutdatedCaches();
// This is done by workbox-build-inject.js for the production build
const assetsToCache = self.__WB_MANIFEST || [];
if (DEBUG_MODE) {
    console.trace(`${componentName}:: Assets that will be cached: `, assetsToCache);
}
workbox_precaching_1.precacheAndRoute(assetsToCache);
//const defaultRouteHandler = createHandlerBoundToURL("/index.html");
//const defaultNavigationRoute = new NavigationRoute(defaultRouteHandler, {
//    //allowlist: [],
//    //denylist: [],
//});
//registerRoute(defaultNavigationRoute);
// Cache the Google Fonts webfont files with a cache first strategy for 1 year.
//registerRoute(
//    /^https:\/\/fonts\.gstatic\.com/,
//    new CacheFirst({
//        cacheName: "google-fonts-webfonts",
//        plugins: [
//            new CacheableResponsePlugin({
//                statuses: [0, 200],
//            }),
//            new ExpirationPlugin({
//                maxAgeSeconds: YEAR_IN_SECONDS,
//                maxEntries: 30,
//                purgeOnQuotaError: true, // Automatically cleanup if quota is exceeded.
//            }),
//        ],
//    }),
//);
// Make JS/CSS fast by returning assets from the cache
// But make sure they're updating in the background for next use
workbox_routing_1.registerRoute(/\.(?:js|css)$/, new workbox_strategies_1.StaleWhileRevalidate({
    cacheName: 'jsAndStyles',
    plugins: [
        new workbox_expiration_1.ExpirationPlugin({
            maxEntries: 1000,
            maxAgeSeconds: DAY_IN_SECONDS,
        }),
    ],
}));
// Cache images
// But clean up after a while
workbox_routing_1.registerRoute(/\.(?:png|gif|jpg|jpeg|svg)$/, new workbox_strategies_1.CacheFirst({
    cacheName: 'images',
    plugins: [
        new workbox_expiration_1.ExpirationPlugin({
            maxEntries: 1000,
            maxAgeSeconds: MONTH_IN_SECONDS,
            purgeOnQuotaError: true,
        }),
    ],
}));
//// Anything authentication related MUST be performed online
//registerRoute(/(https:\/\/)?([^\/\s]+\/)api\/v1\/auth\/.*/, new NetworkOnly());
//// Database access is only supported while online
//registerRoute(/(https:\/\/)?([^\/\s]+\/)database\/.*/, new NetworkOnly());
//# sourceMappingURL=index.js.map