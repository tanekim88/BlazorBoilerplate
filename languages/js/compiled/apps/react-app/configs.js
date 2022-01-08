import { ConfigBase } from '#shared/configs.base';
import { reactAppPaths } from './paths';
export class ReactAppConfig extends ConfigBase {
    rootDir = reactAppPaths.toAbsolutePath();
    RootDir = reactAppPaths.toAbsolutePath();
    projectName = 'reactrApp';
    title = 'App title';
    name = 'App name';
    shortName = 'App short name';
    developerName = 'Tane Kim';
    developerUrl = 'www.taneware.com';
    description = 'app desc';
}
export const reactAppConfig = new ReactAppConfig();
//# sourceMappingURL=configs.js.map