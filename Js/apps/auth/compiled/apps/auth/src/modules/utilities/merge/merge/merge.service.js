"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMergeService = void 0;
const merge_service_1 = require("#shared/src/modules/utilities/merge/merge/merge.service");
const process_webpack_providers_1 = require("#shared/src/functions/process-webpack-providers");
let AuthMergeService = class AuthMergeService extends merge_service_1.MergeService {
};
AuthMergeService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], AuthMergeService);
exports.AuthMergeService = AuthMergeService;
//# sourceMappingURL=merge.service.js.map