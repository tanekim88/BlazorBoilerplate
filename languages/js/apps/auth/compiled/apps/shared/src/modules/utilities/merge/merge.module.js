"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MergeModule = void 0;
const process_webpack_providers_1 = require("../../../functions/process-webpack-providers");
const merge_service_1 = require("./merge/merge.service");
let MergeModule = class MergeModule {
};
MergeModule = __decorate([
    process_webpack_providers_1.CustomModule({
        providers: [merge_service_1.MergeService],
    })
], MergeModule);
exports.MergeModule = MergeModule;
//# sourceMappingURL=merge.module.js.map