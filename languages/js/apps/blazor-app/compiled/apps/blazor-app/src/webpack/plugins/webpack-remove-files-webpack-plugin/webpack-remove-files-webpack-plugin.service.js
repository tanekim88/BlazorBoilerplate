var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomInjectable } from '@projects/shared/src/functions/process-providers';
import { WebpackRemoveFilesWebpackPluginService, WebpackPreRemoveFilesWebpackPluginService, } from '@projects/shared/src/webpack/plugins/webpack-remove-files-webpack-plugin/webpack-remove-files-webpack-plugin.service';
const RemoveFilesWebpackPlugin = require('remove-files-webpack-plugin');
let BlazorAppWebpackPreRemoveFilesWebpackPluginService = class BlazorAppWebpackPreRemoveFilesWebpackPluginService extends WebpackPreRemoveFilesWebpackPluginService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
};
BlazorAppWebpackPreRemoveFilesWebpackPluginService = __decorate([
    CustomInjectable()
], BlazorAppWebpackPreRemoveFilesWebpackPluginService);
export { BlazorAppWebpackPreRemoveFilesWebpackPluginService };
let BlazorAppWebpackRemoveFilesWebpackPluginService = class BlazorAppWebpackRemoveFilesWebpackPluginService extends WebpackRemoveFilesWebpackPluginService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
};
BlazorAppWebpackRemoveFilesWebpackPluginService = __decorate([
    CustomInjectable()
], BlazorAppWebpackRemoveFilesWebpackPluginService);
export { BlazorAppWebpackRemoveFilesWebpackPluginService };
//# sourceMappingURL=webpack-remove-files-webpack-plugin.service.js.map