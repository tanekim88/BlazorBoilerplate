var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomModule } from '#shared/src/functions/process-providers';
import { PostcssModule } from '#shared/src/modules/postcss/postcss.module';
import { SolidAppEnvironmentModule } from './environment/environment.module';
import { SolidAppUtilitiesModule } from './utilities/utilities.module';
let SolidAppModulesModule = class SolidAppModulesModule {
};
SolidAppModulesModule = __decorate([
    CustomModule({
        providers: [],
        imports: [SolidAppUtilitiesModule, SolidAppEnvironmentModule, PostcssModule],
    })
], SolidAppModulesModule);
export { SolidAppModulesModule };
//# sourceMappingURL=modules.module.js.map