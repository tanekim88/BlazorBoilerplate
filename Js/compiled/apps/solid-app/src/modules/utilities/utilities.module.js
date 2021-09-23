var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomModule } from '#shared/src/functions/process-providers';
import { MergeModule as SolidAppMergeModule } from './merge/merge.module';
import { RegexModule as SolidAppRegexModule } from './regex/regex.module';
let SolidAppUtilitiesModule = class SolidAppUtilitiesModule {
};
SolidAppUtilitiesModule = __decorate([
    CustomModule({
        imports: [SolidAppMergeModule, SolidAppRegexModule],
        providers: [],
    })
], SolidAppUtilitiesModule);
export { SolidAppUtilitiesModule };
//# sourceMappingURL=utilities.module.js.map