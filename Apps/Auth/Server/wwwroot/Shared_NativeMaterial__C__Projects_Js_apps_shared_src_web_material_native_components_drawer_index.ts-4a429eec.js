/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkblazor_app"] = self["webpackChunkblazor_app"] || []).push([["Shared_NativeMaterial__C__Projects_Js_apps_shared_src_web_material_native_components_drawer_index.ts-4a429eec"],{

/***/ "../shared/src/web/material/native/components/drawer/_index.scss":
/*!***********************************************************************!*\
  !*** ../shared/src/web/material/native/components/drawer/_index.scss ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://blazor-app/../shared/src/web/material/native/components/drawer/_index.scss?");

/***/ }),

/***/ "../shared/src/web/material/native/components/drawer/index.ts":
/*!********************************************************************!*\
  !*** ../shared/src/web/material/native/components/drawer/index.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\n__webpack_require__(/*! ./_index.scss */ \"../shared/src/web/material/native/components/drawer/_index.scss\");\r\nconst list_1 = __webpack_require__(/*! @material/list */ \"../../node_modules/@material/list/index.js\");\r\nconst drawer_1 = __webpack_require__(/*! @material/drawer */ \"../../node_modules/@material/drawer/index.js\");\r\nconst top_app_bar_1 = __webpack_require__(/*! @material/top-app-bar */ \"../../node_modules/@material/top-app-bar/index.js\");\r\nconst appBarEl = document.getElementById('app-bar');\r\nconst mainContentEl = document.getElementById('main-content');\r\nif (mainContentEl && appBarEl) {\r\n    const topAppBar = top_app_bar_1.MDCTopAppBar.attachTo(appBarEl);\r\n    [].map.call(document.querySelectorAll('.mdc-drawer'), function (el) {\r\n        const drawer = drawer_1.MDCDrawer.attachTo(el);\r\n        topAppBar.setScrollTarget(mainContentEl);\r\n        topAppBar.listen('MDCTopAppBar:nav', () => {\r\n            drawer.open = !drawer.open;\r\n        });\r\n        [].map.call(el.querySelectorAll('.mdc-list'), function (el2) {\r\n            const list = list_1.MDCList.attachTo(el2);\r\n            list.wrapFocus = true;\r\n            el2.addEventListener('click', (event) => {\r\n                mainContentEl.querySelector('input, button').focus();\r\n            });\r\n        });\r\n    });\r\n    document.body.addEventListener('MDCDrawer:closed', () => {\r\n        mainContentEl.querySelector('input, button').focus();\r\n    });\r\n}\r\n// function init(ref, component) {\r\n//     ref.matBlazorRef = new MDCDrawer(ref);\r\n//     ref.addEventListener('MDCDrawer:closed', () => {\r\n//         component.invokeMethodAsync('ClosedHandler');\r\n//     });\r\n// }\r\n// function setOpened(ref, opened) {\r\n//     ref.matBlazorRef.open = opened;\r\n// }\r\n// export const drawer = {\r\n//     init,\r\n//     setOpened,\r\n// };\r\n\n\n//# sourceURL=webpack://blazor-app/../shared/src/web/material/native/components/drawer/index.ts?");

/***/ })

}]);