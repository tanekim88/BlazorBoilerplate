var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WebpackRulesBaseService } from '../webpack-rules-base/webpack-rules-base.service';
import { CustomInjectable } from '#shared/src/functions/process-providers';
let WebpackImageRulesService = class WebpackImageRulesService extends WebpackRulesBaseService {
    createRule(options) {
        return this.mergeService.mergeOptions(super.createRule(), {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        esModule: true,
                        mimeType: true,
                        encoding: true,
                        // generator: (content, mimetype, encoding, resourcePath) => {
                        //   if (/\.html$/i.test(resourcePath)) {
                        //     return `data:${mimetype},${content.toString()}`;
                        //   }
                        //   return `data:${mimetype}${encoding ? `;${encoding}` : ''},${content.toString(encoding)}`;
                        // }
                        fallback: require.resolve('responsive-loader'),
                        // quality: 85
                    },
                },
            ],
        }, options);
    }
    createRules() {
        return [...super.createRules(), this.createRule()];
    }
};
WebpackImageRulesService = __decorate([
    CustomInjectable()
], WebpackImageRulesService);
export { WebpackImageRulesService };
//# sourceMappingURL=image-rules.service.js.map