var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import PostcssRfsAutopilot from 'postcss-rfs-autopilot';
import { PostcssBaseService } from '../postcss-base/postcss-base.service';
import { CustomInjectable } from '#shared/src/functions/process-providers';
const numbers = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64];
let PostcssRfsAutopilotService = class PostcssRfsAutopilotService extends PostcssBaseService {
    constructor() {
        super(PostcssRfsAutopilot);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {
            includedRules: ['*'],
            //includedSelectors: [
            //    'p #hello'
            //], //Selectors you want to include,
            includedUnits: ['px', 'rem'],
            excludedRules: ['width'],
            excludedSelectors: [...numbers.map((num) => `.w-${num}`)],
            //excludedUnits: [], //Units you want to exclude
            silentConsole: true,
        }, options);
    }
};
PostcssRfsAutopilotService = __decorate([
    CustomInjectable(),
    __metadata("design:paramtypes", [])
], PostcssRfsAutopilotService);
export { PostcssRfsAutopilotService };
//# sourceMappingURL=postcss-rfs-autopilot.service.js.map