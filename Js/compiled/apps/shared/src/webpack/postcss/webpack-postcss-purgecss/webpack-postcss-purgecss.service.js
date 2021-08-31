var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { WebpackPostcssBaseService } from '../webpack-postcss-base/webpack-postcss-base.service';
import { CustomInjectable } from '#shared/src/functions/process-providers';
import PurgeCss from '@fullhuman/postcss-purgecss';
let WebpackPostcssPurgecssService = class WebpackPostcssPurgecssService extends WebpackPostcssBaseService {
    constructor() {
        super(PurgeCss);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:!\/]+/g) || [],
        }, options);
    }
};
WebpackPostcssPurgecssService = __decorate([
    CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackPostcssPurgecssService);
export { WebpackPostcssPurgecssService };
//# sourceMappingURL=webpack-postcss-purgecss.service.js.map