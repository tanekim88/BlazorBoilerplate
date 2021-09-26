"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blazorAppConfig = exports.BlazorAppConfig = void 0;
const configs_base_1 = require("@projects/shared/configs.base");
const paths_1 = require("./paths");
class BlazorAppConfig extends configs_base_1.ConfigBase {
    constructor() {
        super(...arguments);
        this.rootDir = paths_1.blazorAppPaths.toAbsolutePath();
        this.RootDir = paths_1.BlazorAppPaths.toAbsolutePath();
        this.projectName = 'blazorApp';
        this.title = 'App title';
        this.name = 'App name';
        this.shortName = 'App short name';
        this.developerName = 'Tane Kim';
        this.developerUrl = 'www.taneware.com';
        this.description = 'app desc';
    }
}
exports.BlazorAppConfig = BlazorAppConfig;
exports.blazorAppConfig = new BlazorAppConfig();
//# sourceMappingURL=configs.js.map