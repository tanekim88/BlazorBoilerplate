"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _prettierrc_1 = __importDefault(require("@shared/.prettierrc"));
const deepmerge_1 = __importDefault(require("deepmerge"));
exports.default = deepmerge_1.default(_prettierrc_1.default, {});
//# sourceMappingURL=.prettierrc.js.map