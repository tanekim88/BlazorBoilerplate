import { ConfigBase } from '#shared/configs.base';
import { SolidAppPaths, blazorAppPaths } from './paths';
export class SolidAppConfig extends ConfigBase {
    rootDir = blazorAppPaths.toAbsolutePath();
    RootDir = SolidAppPaths.toAbsolutePath();
    projectName = 'blazorApp';
    title = 'App title';
    name = 'App name';
    shortName = 'App short name';
    developerName = 'Tane Kim';
    developerUrl = 'www.taneware.com';
    description = 'app desc';
}
export const blazorAppConfig = new SolidAppConfig();
//# sourceMappingURL=configs.js.map