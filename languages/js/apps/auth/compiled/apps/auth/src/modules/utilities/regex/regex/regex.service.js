"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRegexService = void 0;
const regex_service_1 = require("@projects/shared/src/modules/utilities/regex/regex/regex.service");
const process_webpack_providers_1 = require("@projects/shared/src/functions/process-webpack-providers");
let AuthRegexService = class AuthRegexService extends regex_service_1.RegexService {
};
AuthRegexService = __decorate([
    process_webpack_providers_1.CustomInjectable()
], AuthRegexService);
exports.AuthRegexService = AuthRegexService;
//# sourceMappingURL=regex.service.js.map