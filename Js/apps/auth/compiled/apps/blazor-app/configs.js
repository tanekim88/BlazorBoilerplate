"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blazorAppConfig = exports.SolidAppConfig = void 0;
const configs_base_1 = require("#shared/configs.base");
const paths_1 = require("./paths");
class SolidAppConfig extends configs_base_1.ConfigBase {
    constructor() {
        super(...arguments);
        this.rootDir = paths_1.blazorAppPaths.toAbsolutePath();
        this.RootDir = paths_1.SolidAppPaths.toAbsolutePath();
        this.projectName = 'blazorApp';
        this.title = 'App title';
        this.name = 'App name';
        this.shortName = 'App short name';
        this.developerName = 'Tane Kim';
        this.developerUrl = 'www.taneware.com';
        this.description = 'app desc';
    }
}
exports.SolidAppConfig = SolidAppConfig;
exports.blazorAppConfig = new SolidAppConfig();
//# sourceMappingURL=configs.js.map