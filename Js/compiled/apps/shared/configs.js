export const LOCAL_CONFIG = Symbol('LOCAL_CONFIG');
import { ConfigBase } from './configs.base';
import { rootConfig } from '#root/configs';
import { blazorAppConfig } from '#blazor-app/configs';
import { authConfig } from '#auth/configs';
// import { identityServerConfig } from '@IdentityServer/configs';
import path from 'path';
import { sharedPaths } from './paths';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);
class SharedConfig extends ConfigBase {
    rootDir = sharedPaths.toAbsolutePath();
    RootDir = sharedPaths.toAbsolutePath();
    projectName = path.basename(__dirname);
    name = 'Shared Library';
    title = 'App title';
    shortName = 'App short name';
    developerName = 'Tane Kim';
    developerUrl = 'www.taneware.com';
    description = 'app desc';
    dependentProjects = [];
}
export const sharedConfig = new SharedConfig();
class Configs {
    allConfigs = [rootConfig, sharedConfig, blazorAppConfig, authConfig];
    get allRootDirs() {
        return this.allConfigs.map((config) => config.rootDir);
    }
}
export const configs = new Configs();
//# sourceMappingURL=configs.js.map