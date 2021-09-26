"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = exports.AuthConfig = void 0;
const configs_base_1 = require("#shared/configs.base");
const paths_1 = require("./paths");
class AuthConfig extends configs_base_1.ConfigBase {
    constructor() {
        super(...arguments);
        this.rootDir = paths_1.authPaths.toAbsolutePath();
        this.RootDir = paths_1.AuthPaths.toAbsolutePath();
        this.projectName = 'Auth';
        this.title = 'App title';
        this.name = 'App name';
        this.shortName = 'App short name';
        this.developerName = 'Tane Kim';
        this.developerUrl = 'www.taneware.com';
        this.description = 'app desc';
    }
}
exports.AuthConfig = AuthConfig;
exports.authConfig = new AuthConfig();
//# sourceMappingURL=configs.js.map