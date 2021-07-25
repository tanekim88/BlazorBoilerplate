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
import PostcssConditionals from 'postcss-conditionals';
import { CustomInjectable } from '@shared/src/functions/process-providers';
let WebpackPostcssConditionalsService = class WebpackPostcssConditionalsService extends WebpackPostcssBaseService {
    /**
     *
     */
    constructor() {
        super(PostcssConditionals);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
};
WebpackPostcssConditionalsService = __decorate([
    CustomInjectable(),
    __metadata("design:paramtypes", [])
], WebpackPostcssConditionalsService);
export { WebpackPostcssConditionalsService };
//# sourceMappingURL=webpack-postcss-conditionals.service.js.map