"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackModule = void 0;
const webpack_dev_service_1 = require("./webpack-dev/webpack-dev.service");
const webpack_prod_service_1 = require("./webpack-prod/webpack-prod.service");
const webpack_shared_base_service_1 = require("./webpack-shared-base/webpack-shared-base.service");
const webpack_minimizers_module_1 = require("./minimizers/webpack-minimizers.module");
const webpack_plugins_module_1 = require("./plugins/webpack-plugins.module");
const webpack_postcss_module_1 = require("./postcss/webpack-postcss.module");
const webpack_rules_module_1 = require("./rules/webpack-rules.module");
const modules_module_1 = require("../modules/modules.module");
const webpack_base_service_1 = require("./webpack-base/webpack-base.service");
const process_webpack_providers_1 = require("../functions/process-webpack-providers");
const webpack_shared_config_service_1 = require("./webpack-shared-config/webpack-shared-config.service");
const webpack_shared_service_1 = require("./webpack-shared/webpack-shared.service");
const webpack_shared_aspnetcore_service_1 = require("./webpack-shared-aspnetcore/webpack-shared-aspnetcore.service");
let WebpackModule = class WebpackModule {
};
WebpackModule = __decorate([
    process_webpack_providers_1.CustomModule({
        imports: [modules_module_1.ModulesModule, webpack_minimizers_module_1.WebpackMinimizersModule, webpack_plugins_module_1.WebpackPluginsModule, webpack_postcss_module_1.WebpackPostcssModule, webpack_rules_module_1.WebpackRulesModule],
        providers: [
            webpack_base_service_1.WebpackBaseService,
            webpack_dev_service_1.WebpackDevService,
            webpack_prod_service_1.WebpackProdService,
            webpack_shared_base_service_1.WebpackSharedBaseService,
            webpack_shared_config_service_1.WebpackSharedConfigService,
            webpack_shared_service_1.WebpackSharedService,
            webpack_shared_aspnetcore_service_1.WebpackSharedAspnetcoreService,
        ],
    })
], WebpackModule);
exports.WebpackModule = WebpackModule;
//# sourceMappingURL=webpack.module.js.map