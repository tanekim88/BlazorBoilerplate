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
import SVGSpritemapPlugin from 'svg-spritemap-webpack-plugin';
import { CustomInjectable } from '#shared/src/functions/process-providers';
import { sharedPaths } from '#shared/paths';
import path from 'path';
let WebpackSvgSpriteMapWebpackPluginService = class WebpackSvgSpriteMapWebpackPluginService extends WebpackPluginBaseService {
    constructor() {
        super(SVGSpritemapPlugin);
    }
    createManyOptions(options1, options2) {
        const optionsOverride = [
            [path.resolve(sharedPaths.node_modules.toAbsolutePath(), '@icon/open-iconic/icons/*.svg')],
            {
                output: {
                    filename: 'open-iconic-icons.svg',
                },
                sprite: {
                    prefix: 'oi oi-',
                },
            },
        ];
        const options = [options1, options2];
        return super
            .createManyOptions([], {})
            .map((opt, i) => {
            return this.mergeService.mergeOptions(opt, optionsOverride[i]);
        })
            .map((opt, i) => {
            return this.mergeService.mergeOptions(opt, options[i]);
        });
    }
};
WebpackSvgSpriteMapWebpackPluginService = __decorate([
    CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackSvgSpriteMapWebpackPluginService);
export { WebpackSvgSpriteMapWebpackPluginService };
//# sourceMappingURL=svg-spritemap-plugin.service.js.map