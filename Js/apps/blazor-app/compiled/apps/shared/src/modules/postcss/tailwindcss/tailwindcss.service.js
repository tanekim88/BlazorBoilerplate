var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import Tailwindcss from 'tailwindcss';
import { PostcssBaseService } from '../../postcss-base/postcss-base.service';
import { CustomInjectable } from '#shared/src/functions/process-providers';
import fs from 'fs';
import { sharedPaths } from '#shared/paths';
const fileToRemove = sharedPaths['tailwind.config.json'].toAbsolutePath();
if (fs.existsSync(fileToRemove)) {
    fs.unlinkSync(fileToRemove);
}
import tailwindConfig from '#shared/tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';
let TailwindcssService = class TailwindcssService extends PostcssBaseService {
    constructor() {
        super(Tailwindcss);
    }
    createOptions(options) {
        console.dir(tailwindConfig);
        const resolvedConfig = resolveConfig(tailwindConfig);
        console.dir(resolvedConfig);
        return this.mergeService.mergeOptions(super.createOptions(), {
            config: resolvedConfig,
        });
    }
};
TailwindcssService = __decorate([
    CustomInjectable(),
    __metadata("design:paramtypes", [])
], TailwindcssService);
export { TailwindcssService };
//# sourceMappingURL=tailwindcss.service.js.map