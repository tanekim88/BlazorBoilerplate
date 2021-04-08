"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const _eslintrc_1 = __importDefault(require("@shared/.eslintrc"));
const merge_with_customizer_1 = require("@shared/src/modules/utilities/merge/merge/merge-with-customizer");
exports.default = lodash_1.default.mergeWith(_eslintrc_1.default, {}, merge_with_customizer_1.mergeCustomizer);
//# sourceMappingURL=.eslintrc.js.map