var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomInjectable } from '@projects/shared/src/functions/process-providers';
import { WebpackWebpackFixStyleOnlyEntriesService } from '@projects/shared/src/webpack/plugins/webpack-webpack-fix-style-only-entries/webpack-webpack-fix-style-only-entries.service';
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
let BlazorAppWebpackWebpackFixStyleOnlyEntriesService = class BlazorAppWebpackWebpackFixStyleOnlyEntriesService extends WebpackWebpackFixStyleOnlyEntriesService {
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
};
BlazorAppWebpackWebpackFixStyleOnlyEntriesService = __decorate([
    CustomInjectable()
], BlazorAppWebpackWebpackFixStyleOnlyEntriesService);
export { BlazorAppWebpackWebpackFixStyleOnlyEntriesService };
//# sourceMappingURL=webpack-webpack-fix-style-only-entries.service.js.map