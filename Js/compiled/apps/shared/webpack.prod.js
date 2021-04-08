"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_prod_service_1 = require("./src/webpack/webpack-prod/webpack-prod.service");
const webpack_module_1 = require("./src/webpack/webpack.module");
const webpack_base_1 = require("./webpack.base");
const webpackBase = new webpack_base_1.WebpackBase(webpack_module_1.WebpackModule, [webpack_prod_service_1.WebpackProdService]);
exports.default = webpackBase.createWebpackConfigs;
webpackBase.execute();
//# sourceMappingURL=webpack.prod.js.map