"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWebpackModule = void 0;
const process_webpack_providers_1 = require("#shared/src/functions/process-webpack-providers");
const webpack_module_1 = require("#shared/src/webpack/webpack.module");
const modules_module_1 = require("../modules/modules.module");
const webpack_plugins_module_1 = require("./plugins/webpack-plugins.module");
const webpack_rules_module_1 = require("./rules/webpack-rules.module");
const webpack_dev_service_1 = require("./webpack-dev/webpack-dev.service");
const webpack_prod_service_1 = require("./webpack-prod/webpack-prod.service");
const webpack_shared_config_service_1 = require("./webpack-shared-config/webpack-shared-config.service");
const webpack_shared_service_1 = require("./webpack-shared/webpack-shared.service");
let AuthWebpackModule = class AuthWebpackModule {
};
AuthWebpackModule = __decorate([
    process_webpack_providers_1.CustomModule({
        providers: [
            webpack_dev_service_1.AuthWebpackDevConfigService,
            webpack_prod_service_1.AuthWebpackProdConfigService,
            webpack_dev_service_1.AuthWebpackDevService,
            webpack_prod_service_1.AuthWebpackProdService,
            webpack_shared_config_service_1.AuthWebpackSharedConfigService,
            webpack_shared_service_1.AuthWebpackSharedService,
        ],
        imports: [
            webpack_plugins_module_1.AuthWebpackPluginsModule,
            webpack_rules_module_1.AuthWebpackRulesModule,
            // authWebpackPostcssModule,
            // authWebpackMinimizersModule,
            modules_module_1.AuthModulesModule,
            webpack_module_1.WebpackModule,
        ],
    })
], AuthWebpackModule);
exports.AuthWebpackModule = AuthWebpackModule;
//# sourceMappingURL=webpack.module.js.map