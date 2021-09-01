/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
    /******/ var __webpack_modules__ = ({
        /***/ "../shared/src/web/material/native/components/drawer/_index.scss": 
        /*!***********************************************************************!*\
          !*** ../shared/src/web/material/native/components/drawer/_index.scss ***!
          \***********************************************************************/
        /***/ (() => {
            eval("throw new Error(\"Module build failed (from ../../node_modules/mini-css-extract-plugin/dist/loader.js):\\nModuleBuildError: Module build failed (from ../shared/src/webpack/loaders/webpack-custom-sass-loader.js):\\nSassError: Undefined mixin.\\n  ╷\\n6 │ @include list.core-styles;\\n  │ ^^^^^^^^^^^^^^^^^^^^^^^^^\\n  ╵\\n  ..\\\\shared\\\\src\\\\web\\\\material\\\\native\\\\components\\\\drawer\\\\_index.scss 6:1  root stylesheet\\n    at processResult (C:\\\\App\\\\Js\\\\node_modules\\\\webpack\\\\lib\\\\NormalModule.js:703:19)\\n    at C:\\\\App\\\\Js\\\\node_modules\\\\webpack\\\\lib\\\\NormalModule.js:809:5\\n    at C:\\\\App\\\\Js\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js:399:11\\n    at C:\\\\App\\\\Js\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js:251:18\\n    at C:\\\\App\\\\Js\\\\node_modules\\\\loader-runner\\\\lib\\\\LoaderRunner.js:124:13\\n    at C:\\\\App\\\\Js\\\\apps\\\\shared\\\\src\\\\webpack\\\\loaders\\\\webpack-custom-sass-loader.js:49:24\\n    at C:\\\\App\\\\Js\\\\node_modules\\\\sass-loader\\\\dist\\\\index.js:54:7\\n    at Function.call$2 (C:\\\\App\\\\Js\\\\node_modules\\\\sass\\\\sass.dart.js:93263:16)\\n    at _render_closure.call$0 (C:\\\\App\\\\Js\\\\node_modules\\\\sass\\\\sass.dart.js:81607:23)\\n    at Object.Primitives_applyFunction (C:\\\\App\\\\Js\\\\node_modules\\\\sass\\\\sass.dart.js:1127:30)\");\n\n//# sourceURL=webpack://blazor-app/../shared/src/web/material/native/components/drawer/_index.scss?");
            /***/ 
        }),
        /***/ "../shared/src/web/material/native/components/drawer/index.ts": 
        /*!********************************************************************!*\
          !*** ../shared/src/web/material/native/components/drawer/index.ts ***!
          \********************************************************************/
        /***/ ((__unused_webpack_module, exports, __webpack_require__) => {
            "use strict";
            eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\n__webpack_require__(/*! ./_index.scss */ \"../shared/src/web/material/native/components/drawer/_index.scss\");\r\nconst list_1 = __webpack_require__(/*! @material/list */ \"../../node_modules/@material/list/index.js\");\r\nconst drawer_1 = __webpack_require__(/*! @material/drawer */ \"../../node_modules/@material/drawer/index.js\");\r\nconst top_app_bar_1 = __webpack_require__(/*! @material/top-app-bar */ \"../../node_modules/@material/top-app-bar/index.js\");\r\nconst appBarEl = document.getElementById('app-bar');\r\nconst mainContentEl = document.getElementById('main-content');\r\nif (mainContentEl && appBarEl) {\r\n    const topAppBar = top_app_bar_1.MDCTopAppBar.attachTo(appBarEl);\r\n    [].map.call(document.querySelectorAll('.mdc-drawer'), function (el) {\r\n        const drawer = drawer_1.MDCDrawer.attachTo(el);\r\n        topAppBar.setScrollTarget(mainContentEl);\r\n        topAppBar.listen('MDCTopAppBar:nav', () => {\r\n            drawer.open = !drawer.open;\r\n        });\r\n        [].map.call(el.querySelectorAll('.mdc-list'), function (el2) {\r\n            const list = list_1.MDCList.attachTo(el2);\r\n            list.wrapFocus = true;\r\n            el2.addEventListener('click', (event) => {\r\n                mainContentEl.querySelector('input, button').focus();\r\n            });\r\n        });\r\n    });\r\n    document.body.addEventListener('MDCDrawer:closed', () => {\r\n        mainContentEl.querySelector('input, button').focus();\r\n    });\r\n}\r\n// function init(ref, component) {\r\n//     ref.matBlazorRef = new MDCDrawer(ref);\r\n//     ref.addEventListener('MDCDrawer:closed', () => {\r\n//         component.invokeMethodAsync('ClosedHandler');\r\n//     });\r\n// }\r\n// function setOpened(ref, opened) {\r\n//     ref.matBlazorRef.open = opened;\r\n// }\r\n// export const drawer = {\r\n//     init,\r\n//     setOpened,\r\n// };\r\n\n\n//# sourceURL=webpack://blazor-app/../shared/src/web/material/native/components/drawer/index.ts?");
            /***/ 
        })
        /******/ 
    });
    /************************************************************************/
    /******/ // The module cache
    /******/ var __webpack_module_cache__ = {};
    /******/
    /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
        /******/ // Check if module is in cache
        /******/ var cachedModule = __webpack_module_cache__[moduleId];
        /******/ if (cachedModule !== undefined) {
            /******/ return cachedModule.exports;
            /******/ }
        /******/ // Create a new module (and put it into the cache)
        /******/ var module = __webpack_module_cache__[moduleId] = {
            /******/ // no module.id needed
            /******/ // no module.loaded needed
            /******/ exports: {}
            /******/ 
        };
        /******/
        /******/ // Execute the module function
        /******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        /******/
        /******/ // Return the exports of the module
        /******/ return module.exports;
        /******/ 
    }
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/ __webpack_require__.m = __webpack_modules__;
    /******/
    /************************************************************************/
    /******/ /* webpack/runtime/chunk loaded */
    /******/ (() => {
        /******/ var deferred = [];
        /******/ __webpack_require__.O = (result, chunkIds, fn, priority) => {
            /******/ if (chunkIds) {
                /******/ priority = priority || 0;
                /******/ for (var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--)
                    deferred[i] = deferred[i - 1];
                /******/ deferred[i] = [chunkIds, fn, priority];
                /******/ return;
                /******/ }
            /******/ var notFulfilled = Infinity;
            /******/ for (var i = 0; i < deferred.length; i++) {
                /******/ var [chunkIds, fn, priority] = deferred[i];
                /******/ var fulfilled = true;
                /******/ for (var j = 0; j < chunkIds.length; j++) {
                    /******/ if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
                        /******/ chunkIds.splice(j--, 1);
                        /******/ }
                    else {
                        /******/ fulfilled = false;
                        /******/ if (priority < notFulfilled)
                            notFulfilled = priority;
                        /******/ }
                    /******/ }
                /******/ if (fulfilled) {
                    /******/ deferred.splice(i--, 1);
                    /******/ result = fn();
                    /******/ }
                /******/ }
            /******/ return result;
            /******/ 
        };
        /******/ 
    })();
    /******/
    /******/ /* webpack/runtime/define property getters */
    /******/ (() => {
        /******/ // define getter functions for harmony exports
        /******/ __webpack_require__.d = (exports, definition) => {
            /******/ for (var key in definition) {
                /******/ if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    /******/ Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                    /******/ }
                /******/ }
            /******/ 
        };
        /******/ 
    })();
    /******/
    /******/ /* webpack/runtime/hasOwnProperty shorthand */
    /******/ (() => {
        /******/ __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
        /******/ 
    })();
    /******/
    /******/ /* webpack/runtime/make namespace object */
    /******/ (() => {
        /******/ // define __esModule on exports
        /******/ __webpack_require__.r = (exports) => {
            /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
                /******/ }
            /******/ Object.defineProperty(exports, '__esModule', { value: true });
            /******/ 
        };
        /******/ 
    })();
    /******/
    /******/ /* webpack/runtime/jsonp chunk loading */
    /******/ (() => {
        /******/ // no baseURI
        /******/
        /******/ // object to store loaded and loading chunks
        /******/ // undefined = chunk not loaded, null = chunk preloaded/prefetched
        /******/ // [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
        /******/ var installedChunks = {
            /******/ "Shared_NativeMaterial__C__App_Js_apps_shared_src_web_material_native_components_drawer_index.ts_fa6c7832e729a1713eec86293b4470e7": 0
            /******/ 
        };
        /******/
        /******/ // no chunk on demand loading
        /******/
        /******/ // no prefetching
        /******/
        /******/ // no preloaded
        /******/
        /******/ // no HMR
        /******/
        /******/ // no HMR manifest
        /******/
        /******/ __webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
        /******/
        /******/ // install a JSONP callback for chunk loading
        /******/ var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
            /******/ var [chunkIds, moreModules, runtime] = data;
            /******/ // add "moreModules" to the modules object,
            /******/ // then flag all "chunkIds" as loaded and fire callback
            /******/ var moduleId, chunkId, i = 0;
            /******/ for (moduleId in moreModules) {
                /******/ if (__webpack_require__.o(moreModules, moduleId)) {
                    /******/ __webpack_require__.m[moduleId] = moreModules[moduleId];
                    /******/ }
                /******/ }
            /******/ if (runtime)
                var result = runtime(__webpack_require__);
            /******/ if (parentChunkLoadingFunction)
                parentChunkLoadingFunction(data);
            /******/ for (; i < chunkIds.length; i++) {
                /******/ chunkId = chunkIds[i];
                /******/ if (__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
                    /******/ installedChunks[chunkId][0]();
                    /******/ }
                /******/ installedChunks[chunkIds[i]] = 0;
                /******/ }
            /******/ return __webpack_require__.O(result);
            /******/ 
        };
        /******/
        /******/ var chunkLoadingGlobal = self["webpackChunkblazor_app"] = self["webpackChunkblazor_app"] || [];
        /******/ chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
        /******/ chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
        /******/ 
    })();
    /******/
    /************************************************************************/
    /******/
    /******/ // startup
    /******/ // Load entry module and return exports
    /******/ // This entry module depends on other loaded chunks and execution need to be delayed
    /******/ var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_material_base_component_js-node_modules_material_dom_ponyfill_js", "vendors-node_modules_material_ripple_component_js", "vendors-node_modules_material_list_component_js", "vendors-node_modules_material_top-app-bar_index_js", "vendors-node_modules_material_drawer_index_js-node_modules_material_list_index_js"], () => (__webpack_require__("../shared/src/web/material/native/components/drawer/index.ts")));
    /******/ __webpack_exports__ = __webpack_require__.O(__webpack_exports__);
    /******/
    /******/ 
})();
//# sourceMappingURL=Shared_NativeMaterial__C__App_Js_apps_shared_src_web_material_native_components_drawer_index.ts_fa6c7832e729a1713eec86293b4470e7.js.map