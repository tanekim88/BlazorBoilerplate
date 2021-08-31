"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = exports.sharedConfig = exports.LOCAL_CONFIG = void 0;
exports.LOCAL_CONFIG = Symbol('LOCAL_CONFIG');
const configs_base_1 = require("./configs.base");
const configs_1 = require("#root/configs");
const configs_2 = require("#blazor-app/configs");
const configs_3 = require("#auth/configs");
// import { identityServerConfig } from '@IdentityServer/configs';
const path_1 = __importDefault(require("path"));
const paths_1 = require("./paths");
class SharedConfig extends configs_base_1.ConfigBase {
    constructor() {
        super(...arguments);
        this.rootDir = paths_1.sharedPaths.toAbsolutePath();
        this.RootDir = paths_1.sharedPaths.toAbsolutePath();
        this.projectName = path_1.default.basename(__dirname);
        this.name = 'Shared Library';
        this.title = 'App title';
        this.shortName = 'App short name';
        this.developerName = 'Tane Kim';
        this.developerUrl = 'www.taneware.com';
        this.description = 'app desc';
        this.dependentProjects = [];
    }
}
exports.sharedConfig = new SharedConfig();
class Configs {
    constructor() {
        this.allConfigs = [configs_1.rootConfig, exports.sharedConfig, configs_2.blazorAppConfig, configs_3.authConfig];
    }
    get allRootDirs() {
        return this.allConfigs.map((config) => config.rootDir);
    }
}
exports.configs = new Configs();
//# sourceMappingURL=configs.js.map