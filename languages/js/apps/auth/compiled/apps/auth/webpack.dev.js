"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_base_1 = require("#shared/webpack.base");
const webpack_dev_service_1 = require("./src/webpack/webpack-dev/webpack-dev.service");
const webpack_module_1 = require("./src/webpack/webpack.module");
const webpackBase = new webpack_base_1.WebpackBase(webpack_module_1.AuthWebpackModule, [
    webpack_dev_service_1.AuthWebpackDevConfigService,
    webpack_dev_service_1.AuthWebpackDevService,
]);
exports.default = webpackBase.createWebpackConfigs;
webpackBase.execute();
//# sourceMappingURL=webpack.dev.js.map