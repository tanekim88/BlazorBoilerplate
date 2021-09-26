var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { blazorAppConfig } from '@projects/solid-app/configs';
import { LOCAL_CONFIG } from '@projects/shared/configs';
import { CustomModule } from '@projects/shared/src/functions/process-providers';
import { BlazorAppEnvironmentService } from './environment/environment.service';
let BlazorAppEnvironmentModule = class BlazorAppEnvironmentModule {
};
BlazorAppEnvironmentModule = __decorate([
    CustomModule({
        providers: [
            {
                provide: LOCAL_CONFIG,
                useValue: blazorAppConfig,
            },
            BlazorAppEnvironmentService,
        ],
    })
], BlazorAppEnvironmentModule);
export { BlazorAppEnvironmentModule };
//# sourceMappingURL=environment.module.js.map