"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootConfig = void 0;
const configs_base_1 = require("#shared/configs.base");
const path_1 = __importDefault(require("path"));
class RootConfig extends configs_base_1.ConfigBase {
    constructor() {
        super(...arguments);
        this.rootDir = __dirname;
        this.projectName = path_1.default.basename(__dirname);
        this.name = '';
        this.title = '';
        this.shortName = '';
        this.developerName = '';
        this.developerUrl = '';
        this.description = '';
    }
}
exports.rootConfig = new RootConfig();
//# sourceMappingURL=configs.js.map