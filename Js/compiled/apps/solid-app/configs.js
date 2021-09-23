import { ConfigBase } from '#shared/configs.base';
import { solidAppPaths } from './paths';
export class SolidAppConfig extends ConfigBase {
    rootDir = solidAppPaths.toAbsolutePath();
    RootDir = solidAppPaths.toAbsolutePath();
    projectName = 'solidrApp';
    title = 'App title';
    name = 'App name';
    shortName = 'App short name';
    developerName = 'Tane Kim';
    developerUrl = 'www.taneware.com';
    description = 'app desc';
}
export const solidAppConfig = new SolidAppConfig();
//# sourceMappingURL=configs.js.map