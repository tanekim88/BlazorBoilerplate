var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PostcssBaseService } from '../../postcss-base/postcss-base.service';
import Rfs from 'rfs';
import { CustomInjectable } from '@projects/shared/src/functions/process-providers';
let RfsService = class RfsService extends PostcssBaseService {
    constructor() {
        super(Rfs);
    }
    createOptions(options) {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
};
RfsService = __decorate([
    CustomInjectable(),
    __metadata("design:paramtypes", [])
], RfsService);
export { RfsService };
//# sourceMappingURL=rfs.service.js.map