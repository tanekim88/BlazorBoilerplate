"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_base_1 = require("@shared/webpack.base");
const webpack_dev_service_1 = require("./src/webpack/webpack-dev/webpack-dev.service");
const webpack_module_1 = require("./src/webpack/webpack.module");
const webpackBase = new webpack_base_1.WebpackBase(webpack_module_1.BlazorAppWebpackModule, [
    webpack_dev_service_1.BlazorAppWebpackDevConfigService,
    webpack_dev_service_1.BlazorAppWebpackDevService,
]);
exports.default = webpackBase.createWebpackConfigs;
webpackBase.execute();
//# sourceMappingURL=webpack.dev.js.map