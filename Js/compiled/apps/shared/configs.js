export const LOCAL_CONFIG = Symbol('LOCAL_CONFIG');
import { ConfigBase } from './configs.base';
import { rootConfig } from '@root/configs';
import { blazorAppConfig } from '@blazor-app/configs';
import { authConfig } from '@auth/configs';
// import { identityServerConfig } from '@IdentityServer/configs';
import path from 'path';
import { sharedPaths } from './paths';
class SharedConfig extends ConfigBase {
    constructor() {
        super(...arguments);
        this.rootDir = sharedPaths.toAbsolutePath();
        this.RootDir = sharedPaths.toAbsolutePath();
        this.projectName = path.basename(__dirname);
        this.name = 'Shared Library';
        this.title = 'App title';
        this.shortName = 'App short name';
        this.developerName = 'Tane Kim';
        this.developerUrl = 'www.taneware.com';
        this.description = 'app desc';
        this.dependentProjects = [];
    }
}
export const sharedConfig = new SharedConfig();
class Configs {
    constructor() {
        this.allConfigs = [rootConfig, sharedConfig, blazorAppConfig, authConfig];
    }
    get allRootDirs() {
        return this.allConfigs.map((config) => config.rootDir);
    }
}
export const configs = new Configs();
//# sourceMappingURL=configs.js.map