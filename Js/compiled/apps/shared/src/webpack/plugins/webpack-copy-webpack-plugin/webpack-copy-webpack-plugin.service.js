var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { WebpackPluginBaseService } from '../webpack-plugin-base/webpack-plugin-base.service';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';
import { CustomInjectable } from '@shared/src/functions/process-providers';
import { sharedPaths } from '@shared/paths';
let WebpackCopyWebpackPluginService = class WebpackCopyWebpackPluginService extends WebpackPluginBaseService {
    constructor() {
        super(CopyWebpackPlugin);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            patterns: [
                {
                    from: path.resolve(sharedPaths.node_modules.toAbsolutePath(), 'bootstrap-icons/bootstrap-icons.svg'),
                    to: '',
                },
                // { from: path.resolve(rootWebpackConstants.nodesModuleDir, '@fortawesome/fontawesome-free/sprites'), to: '' },
            ],
        }, options);
    }
};
WebpackCopyWebpackPluginService = __decorate([
    CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackCopyWebpackPluginService);
export { WebpackCopyWebpackPluginService };
//# sourceMappingURL=webpack-copy-webpack-plugin.service.js.map