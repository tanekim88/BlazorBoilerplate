var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomInjectable } from '@projects/shared/src/functions/process-providers';
import _ from 'lodash';
import { mergeCustomizer } from './merge-with-customizer';
let MergeService = class MergeService {
    mergeOptions(...objs) {
        if (Array.isArray(objs[0])) {
            return objs.reduce((acc, curr) => {
                return _.mergeWith(acc, curr, mergeCustomizer());
            }, []);
        }
        return objs.reduce((acc, curr) => {
            return _.mergeWith(acc, curr, mergeCustomizer());
        }, {});
    }
    smartlyMergeOptions(obj1, obj2) {
        const toMerge = [obj1, obj2].flat(Infinity);
        return this.mergeOptions(...toMerge);
    }
};
MergeService = __decorate([
    CustomInjectable()
], MergeService);
export { MergeService };
//# sourceMappingURL=merge.service.js.map