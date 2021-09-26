"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MergeService = void 0;
const process_webpack_providers_1 = require("#shared/src/functions/process-webpack-providers");
const lodash_1 = __importDefault(require("lodash"));
const merge_with_customizer_1 = require("./merge-with-customizer");
let MergeService = class MergeService {
    mergeOptions(...objs) {
        if (Array.isArray(objs[0])) {
            return objs.reduce((acc, curr) => {
                return lodash_1.default.mergeWith(acc, curr, merge_with_customizer_1.mergeCustomizer());
            }, []);
        }
        return objs.reduce((acc, curr) => {
            return lodash_1.default.mergeWith(acc, curr, merge_with_customizer_1.mergeCustomizer());
        }, {});
    }
    smartlyMergeOptions(obj1, obj2) {
        const toMerge = [obj1, obj2].flat(Infinity);
        return this.mergeOptions(...toMerge);
    }
};
MergeService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], MergeService);
exports.MergeService = MergeService;
//# sourceMappingURL=merge.service.js.map